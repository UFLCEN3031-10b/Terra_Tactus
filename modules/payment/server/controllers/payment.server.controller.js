'use strict';

var path = require('path'),
    paypal = require('paypal-rest-sdk'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// paypal needs to be configured here
// these will be substituted for environment variables
// in a production setting
paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AQhc3zi5NCN0iHACmAhKnG-JmLYyA2s1MHqd3pOoVwhsxZcQsCzeNCDzv0cRawcVi77lAALuIIbmBG7-',
    'client_secret': 'EElDdbQueMks39P-1ujM-fl2ib-ssenSWic5API8Vf7_FVeXRSyFZxMGS-qZGN6Gh9JorIxqAs1W17Ti'
});

// function for opening a new order
// this should return a redirect url which will
// lead the browser to paypal
exports.openOrder = function (req, res) {
    var newOrder = new Order();

    // cart can't be empty
    // this is a safety measure as you can't
    // click the button from the cart view when empty
    if (!req.session.cart) {
        return res.status(400).send({
            message: 'cart is empty'
        });
    }

    newOrder.cart = req.session.cart;
    newOrder.open = true;

    // a user is not necessary to open an order
    if (req.user) {
        newOrder.user = req.user._id;
    }

    // beginning of the logic that calculates price
    // this needs to be done server side to ensure no
    // price changing by the user
    var total = 0.0;
    var desc = "";
    newOrder.cart.forEach(function (prodWrap) {
        var tempPrice = -1;

        // make sure user exists
        if (undefined !== req.user) {
            for (var i = 0; i < req.user.priceRoles.length; i++) {
                var r = req.user.priceRoles[i];
                if (r === 'wholesale') {
                    tempPrice = prodWrap.product.wholePrice;
                } else if (r === 'education') {
                    tempPrice = prodWrap.product.eduPrice;
                }
            }
        }

        // default to individual price otherwise
        if (tempPrice === -1) {
            tempPrice = prodWrap.product.indvPrice;
        }

        // failsafe in case the product is malformed
        if (tempPrice === "") {
            tempPrice = "0.00";
        }

        total += parseFloat(prodWrap.quantity)*parseFloat(tempPrice);
        desc += (String(prodWrap.quantity) + "x " + prodWrap.product.proTitle + ", ");
    });

    // this was a problem that arose during testing
    // can't allow a 0 total or paypal gets mad
    // could arise from 0 quantity, but this case should
    // be handled already
    if (total === 0.0 || total === 0) {
        return res.status(400).send({
            message: 'cart cannot have 0.00 for price'
        });
    } else {
        // grab description and convert the price into a string
        desc = desc.substring(0, desc.length - 2);
        newOrder.total = total.toFixed(2);
        newOrder.description = desc;

        // payment data we must send to paypal
        // this includes proper routing for confirming and canceling
        // the order
        var payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://" + req.get('host') + "/api/order/confirm/" + String(newOrder._id),
                "cancel_url": "http://" + req.get('host') + "/api/order/cancel/" + String(newOrder._id)
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": total.toFixed(2)
                },
                "description": desc
            }]
        };

        // here we begin querying paypal to open a request
        // this is an asynchronous call (as most of nodejs is)
        // must be careful to place everything else inside
        paypal.payment.create(payment, function (err, resp) {
            if (err) { // this error usually occurs from 0 price
                // console.log(err);
                return res.status(400).send({
                    message: "payment failed"
                });
            } else if (resp) {
                // save the payment id in session data
                req.session.paymentId = resp.id;

                // extract the redirect url which we send to the
                // client controller
                var rurl;
                for (var i = 0; i < resp.links.length; i++) {
                    if (resp.links[i].method === 'REDIRECT') {
                        rurl = resp.links[i].href;
                    }
                }

                // save paypals message in our database
                // not necessary, but gives us more data to work with
                // can be removed to lower running costs
                newOrder.paypal_create_res = resp;

                // save the data and returns the redirect to the controller
                newOrder.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json({ redirect_url: rurl });
                    }
                });
            }
        });
    }
};

// route that paypal redirects to on successful payment
exports.confirm = function (req, res) {
    // make sure there is an open order
    if (req.order) {
        // get the data from paypal based on the payment id we saved earlier
        paypal.payment.get(req.session.paymentId, function (err, payment) {
            // we also need to save the payer id in session data for later
            req.session.payerId = req.param('PayerID');

            // save the paypal response again
            // this one is necessary to extract shipping address
            req.order.paypal_get_res = payment;

            // save in the database and redirect the browser
            // to our order review page
            req.order.save(function (err) {
                res.redirect('/order/review/' + req.order._id);
            });
        });
    } else {
        // return an error otherwise
        return res.status(400).send({
            message: 'order does not exist'
        });
    }
};

// this is a route for executing the order
// after the user reviews their order on our page
// we send this request to paypal telling them to execute the order
// and transfer the money
exports.executeOrder = function (req, res) {
    paypal.payment.execute(req.session.paymentId, { 'payer_id': req.session.payerId }, function (err, resp) {
        if (err) {
            return res.status(400).send({
                message: "execution failed"
            });
        } else {
            req.order.status = "Awaiting shipper confirmation";
            req.order.paypal_execute_res = resp;
            req.session.cart = [];
            req.order.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json({ redirect_url: '/order/complete/' + req.order._id });
                }
            });
        }
    });
};

exports.close = function (req, res) {
    if (req.order && req.order.open) {
        req.order.open = false;
        req.order.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json({ status: 'OK' });
            }
        });
    } else {
        return res.status(400).send({
            message: 'order not found'
        });
    }
};

exports.cancelOrder = function (req, res) {
    req.order.status = 'Canceled';
    req.order.open = false;
    req.order.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.redirect('/cart');
        }
    });
};

exports.read = function (req, res) {
    if (req.order && req.order.open) {
        res.json(req.order);
    } else {
        res.json(null);
    }
};

exports.orderById = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Order is invalid'
        });
    }

    Order.findById(id).exec(function (err, order) {
        if (err) {
            return next(err);
        } else if (!order) {
            return res.status(404).send({
                message: 'No order with that identifier has been found'
            });
        }

        req.order = order;
        next();
    });
};

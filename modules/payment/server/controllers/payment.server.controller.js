'use strict';

var path = require('path'),
    paypal = require('paypal-rest-sdk'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AQhc3zi5NCN0iHACmAhKnG-JmLYyA2s1MHqd3pOoVwhsxZcQsCzeNCDzv0cRawcVi77lAALuIIbmBG7-',
    'client_secret': 'EElDdbQueMks39P-1ujM-fl2ib-ssenSWic5API8Vf7_FVeXRSyFZxMGS-qZGN6Gh9JorIxqAs1W17Ti'
});

exports.openOrder = function (req, res) {
    var newOrder = new Order();
    newOrder.cart = req.session.cart;
    if (req.user) {
        newOrder.user = req.user._id;
    }

    var total = 0.0;
    var desc = "";
    newOrder.cart.forEach(function (prodWrap) {
        var tempPrice = -1;

        if (undefined !== req.user) {
            for (var i = 0; i < req.user.roles.length; i++) {
                var r = req.user.roles[i];
                if (r === 'wholesale') {
                    tempPrice = prodWrap.product.wholePrice;
                } else if (r === 'education') {
                    tempPrice = prodWrap.product.eduPrice;
                }
            }
        }

        if (tempPrice === -1) {
            tempPrice = prodWrap.product.indvPrice;
        }

        if (tempPrice === "") {
            tempPrice = "0.00";
        }

        total += parseFloat(prodWrap.quantity)*parseFloat(tempPrice);
        desc += (String(prodWrap.quantity) + "x " + prodWrap.product.proTitle + ", ");
    });

    var payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://" + req.get('host') + "/api/order/execute/" + String(newOrder._id),
            "cancel_url": "http://" + req.get('host') + "/api/order/cancel/" + String(newOrder._id)
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total
            },
            "description": desc
        }]
    };

    paypal.payment.create(payment, function (err, resp) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: "payment failed"
            });
        } else if (resp) {
            req.session.paymentId = resp.id;
            var rurl;
            for (var i = 0; i < resp.links.length; i++) {
                if (resp.links[i].method === 'REDIRECT') {
                    rurl = resp.links[i].href;
                }
            }

            newOrder.paypal_create_res = resp;

            newOrder.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json({redirect_url: rurl });
                }
            });
        }
    });
};

exports.executeOrder = function (req, res) {
    paypal.payment.execute(req.session.paymentId, {'payer_id': req.param('PayerID')}, function (err, resp) {
        if (err) {
            return res.status(400).send({
                message: "execution failed"
            });
        } else {
            req.order.status = "COMPLETE";
            req.order.paypal_execute_res = resp;
            req.order.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    req.session.cart = [];
                    res.redirect('/order/complete');
                }
            });
        }
    });
};

exports.cancelOrder = function (req, res) {
    req.order.status = 'CANCELED';
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

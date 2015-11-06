'use strict';

var paypal = require('paypal-rest-sdk'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order');

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AQhc3zi5NCN0iHACmAhKnG-JmLYyA2s1MHqd3pOoVwhsxZcQsCzeNCDzv0cRawcVi77lAALuIIbmBG7-',
    'client_secret': 'EElDdbQueMks39P-1ujM-fl2ib-ssenSWic5API8Vf7_FVeXRSyFZxMGS-qZGN6Gh9JorIxqAs1W17Ti'
});

exports.openOrder = function (req, res) {
    var newOrder = new Order();
    newOrder.cart = req.session.cart;
    if (req.user) {
        newOrder.user = req.user;
    }

    var total = 0.0;
    newOrder.cart.forEach(function (prodWrap) {
        var tempPrice = -1;

        if (undefined !== req.user.roles.length) {
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
    });

    var payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {

        }
    };
};

exports.executeOrder = function (req, res) {};

exports.cancelOrder = function (req, res) {};

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

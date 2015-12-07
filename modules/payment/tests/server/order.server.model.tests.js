'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Order = mongoose.model('Order');

var user, order;

describe('Order Model Unit Tests', function () {
    beforeEach(function (done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'M3@n.jsI$Aw3$0m3'
        });

        user.save(function () {
            order = new Order({
                user: user._id,
                cart: [],
                paypal_create_res: [],
                paypal_get_res: [],
                paypal_execute_res: [],
                open: true
            });

            done();
        });
    });

    it('should save the model when all required fields are given', function (done) {
        order.save(done);
    });

    afterEach(function (done) {
        Order.remove().exec(function () {
            User.remove().exec(done);
        });
    });
});

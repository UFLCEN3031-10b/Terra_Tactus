/**
 * Created by memamdie on 12/4/15.
 */
'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, product;

describe('Product CRUD tests', function () {
    //Before running any tests do this stuff
    before(function (done) {
        app = express.init(mongoose);
        agent = request.agent(app);
        done();
    });
    //Before each test do this stuff
    beforeEach(function (done) {
        credentials = {
            username: 'admin4tests',
            password: 'M3@n.jsI$Aw3$0m3'
        };
        user = new User({
            firstName: 'Admin',
            lastName: 'Test',
            displayName: 'firstName lastName',
            email: 'test@me.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        });

        product = new Product({
            proTitle: 'test product',
            longDes: 'long description',
            shortDes: 'description',
            indvPrice: '1.00',
            eduPrice: '2.00',
            wholePrice: '3.00'
        });

        user.save(function() {
            done();
        });

    });

    //Test # 1 to see if you can access the product edit page without being signed in as a user.
    it('Should attempt to access edit products page without being signed in', function(done){
        agent.get('/api/products-edit')
            .expect(404)
            .end(done);
    });

    //Test # 2 to see if you can access the product edit page without being signed in as a user.
    it('Should attempt to access an edit product page with a valid product id without being signed in', function(done){
        agent.get('/api/product-edit'+product._id)
            .expect(404)
            .end(done);
    });

    //After each test say you're done.
    afterEach(function (done) {
        done();
    });
});

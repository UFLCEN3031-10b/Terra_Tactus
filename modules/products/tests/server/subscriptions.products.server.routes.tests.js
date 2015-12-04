/**
 * Created by memamdie on 12/4/15.
 */
'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, order, product;

describe('Subscription CRUD tests', function () {
    //Before running any tests do this stuff
    before(function (done) {
        app = express.init(mongoose);
        agent = request.agent(app);
        done();
    });
    //Before each test do this stuff
    beforeEach(function (done) {
        credentials = {
            username: 'username4tests',
            password: 'M3@n.jsI$Aw3$0m3'
        };
        done();
    });
    //Test # 1 to see if you can access the subscription edit page without being signed in as a user.
    it('Should attempt to access editing route without being signed in', function(done){
        agent.get('/api/subscription/edit')
            .expect(404)
            .end(done);
    });

    //After each test say you're done.
    afterEach(function (done) {
        done();
    });
});

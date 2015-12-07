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
        user.save(function() {
            done();
        });

    });
    //Test # 1 to see if you can access the subscription edit page without being signed in as a user.
    //it('Should attempt to access edit subscriptions page without being signed in', function(done){
    //    agent.get('/api/subscription/data')
    //        .expect(404)
    //        .end(done);
    //});
    ////Test #2 log in with admin account and access subscriptions
    //it('Should log in to admin then access the page to edit subscriptions', function (done) {
    //    agent.post('/api/auth/signin')
    //        .send(credentials)
    //        .expect(200)
    //        .end(function (signinErr, signinRes) {
    //            if (signinErr) {
    //                return done(signinErr);
    //            }
    //
    //            agent.get('/api/subscription/edit')
    //                .expect(200)
    //                .end(done);
    //        });
    //});

    //After each test say you're done.
    afterEach(function (done) {
        done();
    });
});

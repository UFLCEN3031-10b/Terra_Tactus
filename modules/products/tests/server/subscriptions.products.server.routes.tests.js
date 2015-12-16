'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, subData;

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
            username: 'Admin4tests',
            password: 'M3@n.jsI$Aw3$0m3'
        };
        user = new User({
            firstName: 'Admin',
            lastName: 'Test',
            displayName: 'firstName lastName',
            email: 'test@me.com',
            username: credentials.username,
            password: credentials.password,
            roles: ['admin'],
            provider: 'local'
        });
        subData = {
            pictureUrl: 'hi',
            quote: 'hi',
            typeOne: 'hi',
            typeTwo: 'hi',
            typeOneData: 'hi',
            typeTwoData: 'hi',
            grabber: 'hi',
            modelOnePrice: 'hi',
            modelTwoPrice: 'hi',
            modelThreePrice: 'hi',
            modelOne: 'hi',
            modelTwo: 'hi',
            modelThree: 'hi',
            modelOneDesc: 'hi',
            modelTwoDesc: 'hi',
            modelThreeDesc: 'hi',
            modelOneBtn: 'hi',
            modelTwoBtn: 'hey',
            modelThreeBtn: 'hola'
        };
        user.save(function() {
            done();
        });

    });

    //Test # 1 to see if you can access the subscriptions when not signed in
    it('Should attempt to access subscription page without being signed in', function(done){
        agent.get('/api/subscription/data')
            .expect(200)
            .end(done);
    });

    //Test # 2 to see if you can create subscription without being signed in.
    it('Should not be able to put subscription data without being signed in', function(done){
        agent.put('/api/subscription/data')
            .send(subData)
            .expect(403)
            .end(done);
    });

    //Test #3 to see that subscription data is saved when signed in as an admin
    it('should be able to save subscription data if logged in as an admin', function (done) {
        //note our user was created with admin as its roles attribute
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                    return done(signinErr);
                }

                // Save new data
                agent.put('/api/subscription/data')
                    .send(subData)
                    .expect(200)
                    .end(function (subDataSaveErr, subDataSaveRes) {
                        // Handle subData save error
                        if (subDataSaveErr) {
                            return done(subDataSaveErr);
                        }

                        // Get a list of subscription
                        agent.get('/api/subscription/data')
                            .end(function (subscriptionGetErr, subscriptionGetRes) {
                                // Handle subscription save error
                                if (subscriptionGetErr) {
                                    return done(subscriptionGetErr);
                                }
                                done();
                            });
                    });
            });
    });



    //After each test say you're done.
    afterEach(function (done) {
        User.remove().exec(function () {
            done();
        });

    });
});

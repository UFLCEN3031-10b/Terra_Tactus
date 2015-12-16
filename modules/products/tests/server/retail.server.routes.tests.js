'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, retailData;

describe('Retail CRUD tests', function () {
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
        retailData = {
            pictureUrl: 'hi',
            quote: 'hi',
            description: 'hi'
        };
        user.save(function() {
            done();
        });

    });

    //Test # 1 to see if you can access the retails when not signed in
    it('Should attempt to access retail page without being signed in', function(done){
        agent.get('/api/retail/data')
            .expect(200)
            .end(done);
    });

    //Test # 2 to see if you can create retail without being signed in.
    it('Should not be able to put retail data without being signed in', function(done){
        agent.put('/api/retail/data')
            .send(retailData)
            .expect(403)
            .end(done);
    });

    //Test #3 to see that retail data is saved when signed in as an admin
    it('should be able to save retail data if logged in as an admin', function (done) {
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
                agent.put('/api/retail/data')
                    .send(retailData)
                    .expect(200)
                    .end(function (retailDataSaveErr, retailDataSaveRes) {
                        // Handle retailData save error
                        if (retailDataSaveErr) {
                            return done(retailDataSaveErr);
                        }

                        // Get a list of retail
                        agent.get('/api/retail/data')
                            .end(function (retailGetErr, retailGetRes) {
                                // Handle retail save error
                                if (retailGetErr) {
                                    return done(retailGetErr);
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

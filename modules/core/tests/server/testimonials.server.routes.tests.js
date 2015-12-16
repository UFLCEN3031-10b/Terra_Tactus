'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, testimonialData;

describe('Testimonial CRUD tests', function () {
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
        testimonialData = {
            pictureUrl: 'hi',
            quote: 'hi',
            from: 'hi',
            creditUrl: 'hi',
        };
        user.save(function() {
            done();
        });

    });

    //Test # 1 to see if you can access the testimonials when not signed in
    it('Should attempt to access testimonial page without being signed in', function(done){
        agent.get('/api/testimonials')
            .expect(200)
            .end(done);
    });

    //Test # 2 to see if you can create testimonial without being signed in.
    it('Should not be able to put testimonial data without being signed in', function(done){
        agent.post('/api/testimonials')
            .send(testimonialData)
            .expect(403)
            .end(done);
    });

    //Test #3 to see that testimonial data is saved when signed in as an admin
    it('should be able to save testimonial data if logged in as an admin', function (done) {
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
                agent.post('/api/testimonials')
                    .send(testimonialData)
                    .expect(200)
                    .end(function (testimonialDataSaveErr, testimonialDataSaveRes) {
                        // Handle testimonialData save error
                        if (testimonialDataSaveErr) {
                            return done(testimonialDataSaveErr);
                        }

                        // Get a list of testimonial
                        agent.get('/api/testimonials')
                            .end(function (testimonialGetErr, testimonialGetRes) {
                                // Handle testimonial save error
                                if (testimonialGetErr) {
                                    return done(testimonialGetErr);
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

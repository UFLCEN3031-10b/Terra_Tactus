'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Announcement = mongoose.model('Announcement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, announcement;

/**
 * Announcement routes tests
 */
describe('Announcement CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'firstName',
      lastName: 'lastName',
      displayName: 'firstName lastName',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local',
      roles: [ "admin" ]
    });

    // Save a user to the test db and create new announcement
    user.save(function () {
      announcement = {
        title: 'Testing is fun!',
        username: 'username',
        content: 'Wow, these tests sure are handy',
        link: 'google.com',
        picture: 'samplepicture.com'
      };

      done();
    });
  });

  it('should be able to save an announcement if logged in as admin', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new announcement
        agent.post('/api/announcements')
          .send(announcement)
          .expect(200)
          .end(function (announcementSaveErr, announcementSaveRes) {
            // Handle announcement save error
            if (announcementSaveErr) {
              return done(announcementSaveErr);
            }

            // Get a list of announcements
            agent.get('/api/announcements')
              .end(function (announcementsGetErr, announcementsGetRes) {
                // Handle announcement save error
                if (announcementsGetErr) {
                  return done(announcementsGetErr);
                }

                // Get announcements list
                var announcements = announcementsGetRes.body;

                // Set assertions
                (announcements[0].username).should.equal(user.username);
                (announcements[0].title).should.match('Testing is fun!');
                (announcements[0].content).should.match('Wow, these tests sure are handy');
                (announcements[0].link).should.match('google.com');
                (announcements[0].picture).should.match('samplepicture.com');


                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an announcement if not logged in as admin', function (done) {
    agent.post('/api/announcements')
      .send(announcement)
      .expect(403)
      .end(function (announcementSaveErr, announcementSaveRes) {
        // Call the assertion callback
        done(announcementSaveErr);
      });
  });

  it('should not be able to save an announcement if no title is provided', function (done) {
    // Invalidate title field
    announcement.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new announcement
        agent.post('/api/announcements')
          .send(announcement)
          .expect(400)
          .end(function (announcementSaveErr, announcementSaveRes) {
            // Set message assertion
            (announcementSaveRes.body.message).should.match('Title cannot be blank');

            // Handle announcement save error
            done(announcementSaveErr);
          });
      });
  });

  it('should be able to update an announcement if logged in as an admin in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new announcement
        agent.post('/api/announcements')
          .send(announcement)
          .expect(200)
          .end(function (announcementSaveErr, announcementSaveRes) {
            // Handle announcement save error
            if (announcementSaveErr) {
              return done(announcementSaveErr);
            }

            // Update announcement title
            announcement.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing announcement
            agent.put('/api/announcements/' + announcementSaveRes.body._id)
              .send(announcement)
              .expect(200)
              .end(function (announcementUpdateErr, announcementUpdateRes) {
                // Handle announcement update error
                if (announcementUpdateErr) {
                  return done(announcementUpdateErr);
                }

                // Set assertions
                (announcementUpdateRes.body._id).should.equal(announcementSaveRes.body._id);
                (announcementUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of announcements if not signed in', function (done) {
    // Create new announcement model instance
    var announcementObj = new Announcement(announcement);

    // Save the announcement
    announcementObj.save(function () {
      // Request announcements
      request(app).get('/api/announcements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should return proper error for single announcement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent announcement
    request(app).get('/api/announcements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No announcement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an announcement if signed in as an admin', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new announcement
        agent.post('/api/announcements')
          .send(announcement)
          .expect(200)
          .end(function (announcementSaveErr, announcementSaveRes) {
            // Handle announcement save error
            if (announcementSaveErr) {
              return done(announcementSaveErr);
            }

            // Delete an existing announcement
            agent.delete('/api/announcements/' + announcementSaveRes.body._id)
              .send(announcement)
              .expect(200)
              .end(function (announcementDeleteErr, announcementDeleteRes) {
                // Handle announcement error error
                if (announcementDeleteErr) {
                  return done(announcementDeleteErr);
                }

                // Set assertions
                (announcementDeleteRes.body._id).should.equal(announcementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an announcement if not an admin', function (done) {
    // Set announcement user
    announcement.user = user;

    // Create new announcement model instance
    var announcementObj = new Announcement(announcement);

    // Save the announcement
    announcementObj.save(function () {
      // Try deleting announcement
      request(app).delete('/api/announcements/' + announcementObj._id)
        .expect(403)
        .end(function (announcementDeleteErr, announcementDeleteRes) {
          // Set message assertion
          (announcementDeleteRes.body.message).should.match('User is not authorized');

          // Handle announcement error error
          done(announcementDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Announcement.remove().exec(done);
    });
  });
});

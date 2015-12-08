'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Announcement = mongoose.model('Announcement');

/**
 * Globals
 */
var user, announcement;

/**
 * Unit tests
 */
describe('Announcement Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      roles: {
        type: ['admin']
      },
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      announcement = new Announcement({
        title: 'Announcement Title',
        content: 'Announcement Content',
        username: user.username
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return announcement.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without title', function (done) {
      announcement.title = '';

      return announcement.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Announcement.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});

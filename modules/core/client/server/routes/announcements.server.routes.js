'use strict';

/**
 * Module dependencies.
 */
var announcementsPolicy = require('../policies/announcements.server.policy'),
  announcements = require('../controllers/announcements.server.controller');

module.exports = function (app) {
  // Announcements collection routes
  app.route('/api/announcements').all(announcementsPolicy.isAllowed)
    .get(announcements.list)
    .post(announcements.create);

  // Single announcement routes
  app.route('/api/announcements/:announcementId').all(announcementsPolicy.isAllowed)
    .get(announcements.read)
    .put(announcements.update)
    .delete(announcements.delete);

  // Finish by binding the announcement middleware
  app.param('announcementId', announcements.announcementByID);
};

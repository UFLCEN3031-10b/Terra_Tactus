'use strict';

var core = require('../controllers/core.server.controller'),
    homepageData = require('../controllers/homepageData.server.controller'),
    contact = require('../controllers/contact.server.controller'),
    socialmedia = require('../controllers/socialmedia.server.controller'),
    carouseldata = require('../controllers/carouseldata.server.controller'),
    hompagepolicy = require('../policies/homepage.server.policy.js'),
    testimonials = require('../controllers/testimonial.server.controller');


module.exports = function (app) {
  // routing for homepage data, needs user restriction
  app.route('/api/homepage/data').all(hompagepolicy.isAllowed)
    .get(homepageData.find)
    .put(homepageData.update);

  // routing for contact data, needs user restriction
  app.route('/api/homepage/contact').all(hompagepolicy.isAllowed)
    .get(contact.find)
    .put(contact.update);

  app.route('/api/testimonial/data')
      .get(testimonials.find)
      .put(testimonials.update);

  // routing for adding a new social media link, and retrieving the link
  app.route('/api/homepage/socialmedia').all(hompagepolicy.isAllowed)
    .post(socialmedia.add)
    .get(socialmedia.find);

  // routing for updating and deleting individual links
  app.route('/api/homepage/socialmedia/:smId').all(hompagepolicy.isAllowed)
    .put(socialmedia.update)
    .delete(socialmedia.delete);

  // routes for carousel slide listing and creating
  app.route('/api/homepage/carousel').all(hompagepolicy.isAllowed)
    .get(carouseldata.list)
    .post(carouseldata.create);

  // routes for updating and deleting individual slides
  app.route('/api/homepage/carousel/:slideId').all(hompagepolicy.isAllowed)
    .put(carouseldata.update)
    .delete(carouseldata.remove);

  // slide middleware
  app.param('slideId', carouseldata.slideById);

  // social media middleware
  app.param('smId', socialmedia.smById);

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  // new api routes must occur before this
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};

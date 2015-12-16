'use strict';

module.exports = function(app) {
	var upload  = require('../controllers/upload.server.controller');


	app.route('/api/upload/:filename').get(upload.read);


	app.route('/api/upload').post(upload.create);
};

'use strict';

module.exports = function (app){
  var email = require('../controllers/email.server.controller');

  app.route('/api/mail/sendVReqT').post(email.sendVReqTeacher);
  app.route('/api/mail/confirm').post(email.sendConfirmation);
  app.route('/api/mail/eduConfirmation').post(email.sendEduConfirmation);
  app.route('/api/mail/verifyPDF').post(email.sendUploadedFiles);
};

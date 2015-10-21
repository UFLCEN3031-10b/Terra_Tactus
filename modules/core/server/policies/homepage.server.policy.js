'use strict';

var acl = require('acl');

acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/homepage/data',
            permissions: '*'
        }, {
            resources: '/api/homepage/contact',
            permissions: '*'
        }, {
            resources: '/api/homepage/socialmedia',
            permissions: '*'
        }, {
            resources: '/api/homepage/carousel',
            permissions: '*'
        }]
    }, {
        roles: ['user', 'guest', 'freeUser'],
        allows: [{
            resources: '/api/homepage/data',
            permissions: ['get']
        }, {
            resources: '/api/homepage/contact',
            permissions: ['get']
        }, {
            resources: '/api/homepage/socialmedia',
            permissions: ['get']
        }, {
            resources: '/api/homepage/carousel',
            permissions: ['get']
        }]
    }]);
};

exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};

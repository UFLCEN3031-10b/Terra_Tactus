'use strict';

var acl = require('acl');

acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/products/:productId',
            permissions: '*'
        }, {
            resources: '/api/products',
            permissions: '*'
        }, {
            resources: '/api/products/reveiws/:reviewId',
            permissions: '*'
        }]
    }, {
        roles: ['user', 'freeUser'],
        allows: [{
            resources: '/api/reviews/products/:productId',
            permissions: ['put']
        }]
    }, {
        roles: ['user', 'guest', 'freeUser'],
        allows: [{
            resources: '/api/products/:productId',
            permissions: ['get']
        }, {
            resources: '/api/products',
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

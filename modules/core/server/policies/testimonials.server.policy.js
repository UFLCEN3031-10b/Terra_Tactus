'use strict';

var acl = require('acl');

acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/testimonials/:testimonialId',
            permissions: '*'
        }, {
            resources: '/api/testimonials',
            permissions: '*'
        }]
      }, {
        roles: ['user', 'guest', 'freeUser'],
        allows: [{
            resources: '/api/testimonials/:testimonialId',
            permissions: ['get']
        }, {
            resources: '/api/testimonials',
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

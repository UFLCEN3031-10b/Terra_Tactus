'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Announcements Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/testimonials',
            permissions: '*'
        }]
        //There is an additional testimonial policy that is for admin users in the homepage server policy
    }, {
        roles: ['user'],
        allows: [{
            resources: '/api/testimonials',
            permissions: ['get', 'post']
        }, {
            resources: '/api/testimonials/:testimonialId',
            permissions: ['get']
        }]
    }, {
        roles: ['guest', 'freeUser'],
        allows: [{
            resources: '/api/testimonials',
            permissions: ['get']
        }, {
            resources: '/api/testimonials/:testimonialId',
            permissions: ['get']
        }]
    }]);
};

/**
 * Check If Announcements Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an testimonial is being processed and the current user created it then allow any manipulation
    if (req.testimonial && req.user && req.testimonial.user.id === req.user.id) {
        return next();
    }

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

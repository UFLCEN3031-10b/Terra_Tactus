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
        }]
    }]);
};

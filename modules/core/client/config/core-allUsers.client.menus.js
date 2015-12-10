/**
 * Created by memamdie on 12/9/15.
 */
'use strict';

angular.module('core.all').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('secondbar', {
            title: 'Who Are You?',
            state: 'admin',
            type: 'dropdown',
            roles: ['admin', 'freeUser', 'paidUser']
        });
        Menus.addSubMenuItem('secondbar', 'admin', {
            title: 'Commercial User',
            state: 'commercial'
        });
        Menus.addSubMenuItem('secondbar', 'admin', {
            title: 'Subscriber',
            state: 'subscriptions'
        });
        Menus.addSubMenuItem('secondbar', 'admin', {
            title: 'Retailer',
            state: 'retail'
        });
        Menus.addSubMenuItem('secondbar', 'admin', {
            title: 'Individual Buyer',
            state: 'products'
        });

    }
]);

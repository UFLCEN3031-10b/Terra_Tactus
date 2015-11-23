'use strict';

angular.module('payment').run(['Menus', function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
        title: 'View Orders',
        state: 'admin-orders'
    });
}]);

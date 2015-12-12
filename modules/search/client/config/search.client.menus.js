'use strict';

angular.module('search').run(['Menus', function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
        title: 'View Suggestions',
        state: 'admin-suggestions'
    });
}]);

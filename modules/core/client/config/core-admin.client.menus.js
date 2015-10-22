'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Create Announcement',
      state: 'create-announcement'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
        title: 'Edit Carousel',
        state: 'edit-carousel'
    });
  }
]);

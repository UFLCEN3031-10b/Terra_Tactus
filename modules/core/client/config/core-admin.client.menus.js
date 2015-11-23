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
        title: 'Create Product',
        state: 'create-product'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
        title: 'Review Comments',
        state: 'review-comments'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Edit Carousel',
      state: 'edit-carousel'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Edit Homepage',
      state: 'edit-homepage'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Edit Products',
      state: 'products-edit'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Edit Commercial',
      state: 'commercial-edit'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Edit Subscriptions',
      state: 'subscriptions-edit'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Edit Retail',
      state: 'retail-edit'
    });

  }
]);

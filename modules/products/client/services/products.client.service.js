'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('products').factory('Products', ['$resource',
  function ($resource) {
    return $resource('api/products/:productId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

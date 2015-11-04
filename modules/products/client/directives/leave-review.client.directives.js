'use strict';

angular.module('products')
  .directive('leavereview', function() {
  return {
       restrict: 'E',
       templateUrl: 'modules/products/client/views/leave-review-individual-product.client.view.html'
     };
  });

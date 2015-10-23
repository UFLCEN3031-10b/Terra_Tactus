'use strict';

angular.module('core').controller('TabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'Cultural Products',
            url: 'one.tpl.html'
        }, {
            title: 'Geological Products',
            url: 'two.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    };
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl === $scope.currentTab;
    };
}]);
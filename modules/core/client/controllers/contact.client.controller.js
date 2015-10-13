'use strict';

angular.module('core').controller('ContactController', ['$scope', '$http', function ($scope, $http) {
        $scope.contactName = '';
        $scope.address = '';
        $scope.citystatezip = '';
        $scope.phone = '';
        $scope.fax = '';

        $http.get('/api/contact/info').success(function (res) {
            if (res === null) console.log('[ERROR] contact-info does not exist yet.');
            else {
                $scope.contactName = res.contactName;
                $scope.address = res.address;
                $scope.citystatezip = res.citystatezip;
                $scope.phone = res.phone;
                $scope.fax = res.fax;
            }
        });
    }
]);

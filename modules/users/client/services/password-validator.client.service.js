'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window',
  function ($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    return {
      getResult: function (password) {
        var result = owaspPasswordStrengthTest.test(password);
        return result;
      },
      getPopoverMsg: function () {
        var popoverMsg = "Please enter a passphrase or password with greater than 10 characters containing at least 1 of each the following: uppercase letter, lowercase letter, number, and a special character.";
        return popoverMsg;
      }
    };
  }
]);

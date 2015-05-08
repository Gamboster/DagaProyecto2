'use strict';

/**
 * @ngdoc function
 * @name loginTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loginTestApp
 */
angular.module('loginTestApp')

  .controller('MainCtrl', function($scope, Authentication, $http, $timeout, $window, $location, $rootScope) {
    $scope.getMe = function() {
      $http.get('http://api.rbazan.dev:3000/' + 'users/me').then(function success(response) {
        $scope.user = response.data;
        $scope.alreadyLoggedIn = true;
        showAlert('info', 'Hello', 'and welcome back ' + $scope.user.username + '!');
      }, function error() {
        Authtentication.clearToken();
        console.log('getting user error', arguments);
      }).finally(function() {
        $scope.meRequestComplete = true;
      });
    };

    if (Authentication.isAuthenticated()) {
      $scope.getMe();
    } else {
      $scope.meRequestComplete = true;
    }

    $scope.login = function(username, password) {
      $scope.badCreds = false;
      $http({
        url: 'http://api.rbazan.dev:3000/' + 'login',
        method: 'POST',
        data: {
          username: username,
          password: password
        }
      }).then(function success(response) {
        Authentication.setToken(response.data.token);
        $scope.user = response.data.user;
        $scope.noPicture = true;
        $scope.alreadyLoggedIn = true;
        showAlert('success', 'Hey there!', 'Welcome ' + $scope.user.username + '!');
        $location.path('/about');
      }, function error(response) {
        if (response.status === 404) {
          $scope.badCreds = true;
          showAlert('danger', 'Whoops...', 'Do I know you?');
        } else {
          showAlert('danger', 'Hmmm....', 'Problem logging in! Sorry!');
        }
      });
    };
    

    $scope.logout = function() {
      $scope.funnyPictureUrl = null;
      Authentication.clearToken();
      $scope.user = null;
      $location.path('/')
      showAlert('info', 'Goodbye!', 'Have a great day!');
    };

    var alertTimeout;
    function showAlert(type, title, message, timeout) {
      $scope.alert = {
        hasBeenShown: true,
        show: true,
        type: type,
        message: message,
        title: title
      };
      $timeout.cancel(alertTimeout);
      alertTimeout = $timeout(function() {
        $scope.alert.show = false;
      }, timeout || 1500);
    }
    $rootScope.token=Authentication.getToken();
  });





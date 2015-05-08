'use strict';

/**
 * @ngdoc function
 * @name loginTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the loginTestApp
 */
angular.module('loginTestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

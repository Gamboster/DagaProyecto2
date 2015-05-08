'use strict';

/**
 * @ngdoc overview
 * @name loginTestApp
 * @description
 * # loginTestApp
 *
 * Main module of the application.
 */
angular
  .module('loginTestApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if ($rootScope.token ==  null) {
        
          $location.path('/');
        
      }
      else {
          
        
      }
    })
  })
  
    


  

  


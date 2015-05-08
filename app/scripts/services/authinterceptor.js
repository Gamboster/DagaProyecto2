'use strict';

/**
 * @ngdoc service
 * @name loginTestApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the loginTestApp.
 */
angular.module('loginTestApp')
  .factory('authInterceptor', function ($rootScope, $q, Authentication) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      request: function (config) {
        var token = Authentication.getToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          console.warn('user not authenticated', response);
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }
    }
    
  });
  

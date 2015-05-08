'use strict';

/**
 * @ngdoc service
 * @name loginTestApp.Authentication
 * @description
 * # Authentication
 * Factory in the loginTestApp.
 */
angular.module('loginTestApp')
  .factory('Authentication', function ($window) {
    // Service logic
    // ...
    var tokenKey = 'user-token';
    var storage = $window.localStorage;
    var cachedToken;
    return {
      isAuthenticated: isAuthenticated,
      setToken: setToken,
      getToken: getToken,
      clearToken: clearToken
    };
    function setToken(token) {
      cachedToken = token;
      storage.setItem(tokenKey, token);
    }
    function getToken() {
      if (!cachedToken) {
        cachedToken = storage.getItem(tokenKey);
      }
      return cachedToken;
    }
    function clearToken() {
      cachedToken = null;
      storage.removeItem(tokenKey);
    }
    function isAuthenticated() {
      return !!getToken();
    }
   
  });

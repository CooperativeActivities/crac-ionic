// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var cracApp = angular.module('app', [
	'ionic',
	'ngMessages',
	'ngCookies',
	'app.controllers',
	'app.routes',
	'app.services',
	'app.directives'
]);

cracApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// Interceptor Service
.factory("HttpErrorInterceptorService", ["$q", "$rootScope", "$location","FlashService",
   function($q, $rootScope, $location,FlashService) {
       var success = function(response) {
               // pass through
               return response;
           },
           error = function(response) {
               if(response.status === 401) {
                   FlashService.Error(response.data.message);
               }

               return $q.reject(response);
           };

       return function(httpPromise) {
           return httpPromise.then(success, error);
       };
   }
])

.config(["$httpProvider",
   function($httpProvider) {

		 // Older Angular Version
       //$httpProvider.responseInterceptors.push("HttpErrorInterceptorService");
       $httpProvider.interceptors.push("HttpErrorInterceptorService");

		 // changed by elmar, needed to prevent CORS errors!
		 //$httpProvider.defaults.withCredentials = true;

   }
]);

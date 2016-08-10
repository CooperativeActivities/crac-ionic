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
	'app.services'
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
/*.factory("HttpErrorInterceptorService", ["$q", "$rootScope", "$location","FlashService",
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
])*/

    .service('authInterceptor', function($q, FlashService) {
        var service = this;

        service.responseError = function(response) {
            if (response.status == 401){
                console.log("Fehler");
                FlashService.Error("Benutzername oder Passwort falsch!");
               // $location.path("/login");
            }
            return $q.reject(response);
        };
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])


.config(["$httpProvider",
   function($httpProvider) {

		 // Older Angular Version
       //$httpProvider.responseInterceptors.push("HttpErrorInterceptorService");
      // $httpProvider.interceptors.push("HttpErrorInterceptorService");

		 // changed by elmar, needed to prevent CORS errors!
		 //$httpProvider.defaults.withCredentials = true;
        //$httpProvider.defaults.useXDomain = true;
       //delete $httpProvider.defaults.headers.common['X-Requested-With'];
       //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

       $httpProvider.defaults.useXDomain = true;
       //$httpProvider.defaults.withCredentials = true;
       /*delete $httpProvider.defaults.headers.common['X-Requested-With'];
       $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
       $httpProvider.defaults.headers.common = {};
       $httpProvider.defaults.headers.post = {};
       $httpProvider.defaults.headers.put = {};
       $httpProvider.defaults.headers.patch = {};
       $httpProvider.defaults.headers.get = {};*/
   }
]);

var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

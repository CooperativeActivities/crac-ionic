(function () {
    'use strict';

    cracApp.factory('AuthenticationService', AuthenticationService);

    var baseURL = "https://core.crac.at/crac-core";

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {

        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
            var authdata = Base64.encode(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

            $http.get(baseURL+'/user/check')
                .success(function (response,status, headers) {
                    if(response.user != null){
                        console.log("Login successful");

                        // SetCredentials(username,headers('Authorization'));

                        // $http.defaults.headers.common['Authorization'] = headers('Authorization');
                        $cookieStore.put('globals', $rootScope.globals);

                        response = { success: true };
                    } else {
                        response = { success: false, message: 'Username or password is incorrect' };
                    }
                    callback(response);
                })
                .error(function(response,status, headers){
                    response = { success: false, message: 'Username or password is incorrect' };
                });

			 /* var authdata = Base64.encode(username + ':' + password);

			  // Hm, works.. reproduces a respone (unauthorized) :(
			  var req = {
					method: 'GET',
					url: baseURL + 'user/login'
			   };

				// When I add a custom header the server tells me to go
			  var req = {
				   method: 'GET',
				   url: baseURL + 'user/login',
				   headers: {
				     'Authorization': 'Basic ' + authdata
				   }
				};

				$http(req).success(function (response, status, headers) {

						 console.log("Success");
						 console.log(response);

                    if(response.user != null){

                        var isAdmin = (typeof response.user.isAdmin === "undefined") ? false : response.user.isAdmin;

                        SetCredentials(username, password, isAdmin);
                       // SetCredentials(username,headers('Authorization'));

                       // $http.defaults.headers.common['Authorization'] = headers('Authorization');
                        $cookieStore.put('globals', $rootScope.globals);

                        response = { success: true };
                    } else {
                        response = { success: false, message: 'Username or password is incorrect' };
                    }
                    callback(response);
                }).error(function (e) {
						 console.log("error!" + e);
            });*/
        }

        function SetCredentials(username, password, isAdmin) {
            var authdata = Base64.encode(username + ':' + password);

            console.log("in setCredentials: isadmin == "+isAdmin);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata,
                    isAdmin: isAdmin
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function Logout(){
            $http.delete(baseUrl+'/api/login.json');
            ClearCredentials();
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();

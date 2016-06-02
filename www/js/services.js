angular.module('app.services', [])

.factory('UserDataService', ["$http", function($http){

	var srv = {};

	// URL to our REST-Service
	srv._baseURL = "https://core.crac.at/crac-core/";

	// Send current user data as basic auth
	srv.getUserLogin = function(user){
		return $http.get(srv._baseURL + "user/login", user);
	}

	/**
	  * EXPOSE Service Methods
	 **/
	 return {
		 getUserLogin : function(user) {
			 return srv.getUserLogin(user);
		 }
	 }

}])

.service('BlankService', [function(){

}]);

angular.module('app.services', [])

.factory('UserDataService', ["$http", function($http){

	var srv = {};

	// URL to REST-Service
	srv._baseURL = "https://core.crac.at/crac-core/";

	// Get login status from current user (basic auth)
	srv.getUserLogin = function(){
		return $http.get(srv._baseURL + "user/login");
	}

	// Get all users
	srv.getAllUsers = function(){
		return $http.get(srv._baseURL + "user");
	}

	// Get specified user by id (integer)
	srv.getUserById = function(id){
		return $http.get(srv._baseURL + "user/" + id);
	}

	/**
	  * Given a user in the following structure
	  {
	    "name":"test",
	    "password": "test",
	    "role":"USER",
	    "firstName":"TestHans",
	    "lastName":"TestName",
	    "phone":"234",
	    "email":"asd@asd"
		}
	*/
	srv.createUser = function(user){
		return $http.post(srv._baseURL + "user", user);
	}

	// Deletes the user with the given id
	srv.deleteUserById = function(id){
		return $http.delete(srv._baseURL + "user/" + id);
	}

	/**
	  * Updates the user with the specified id and new user data
	  {
	    "name":"test",
	    "password": "test",
	    "role":"USER",
	    "firstName":"TestHans",
	    "lastName":"TestName",
	    "phone":"234",
	    "email":"asd@asd"
	 }
	 */
   srv.updateUserById = function(id, newUserData){
		return $http.put(srv._baseURL + "user/" + id, newUserData);
	}

	// Returns the current logged in user
	srv.getCurrentUser = function(){
		return $http.get(srv._baseURL + "user/me");
	}

	/**
	  * EXPOSE Service Methods
	 **/
	 return {
		 getUserLogin : function(){
			 return srv.getUserLogin();
		 },
		 getAllUsers : function(){
			 return srv.getAllUsers();
		 },
		 getUserById : function(id){
			 return srv.getUserById(id);
		 },
		 createUser : function(user){
			 return srv.createUser(user);
		 },
		 deleteUserById : function(id){
			 return srv.deleteUserById(id);
		 },
		 updateUserById : function(id, newUserData){
			 return srv.updateUserById(id, newUserData);
		 },
		 getCurrentUser : function(){
			return srv.getCurrentUser();
		 }
	 }

}])

.service('BlankService', [function(){

}])



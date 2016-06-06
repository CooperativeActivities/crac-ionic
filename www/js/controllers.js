angular.module('app.controllers', [])

.controller('neuigkeitenCtrl', function($scope, $http) {
    $http.get('../localData/news.json').success(function(response) {
        $scope.newslist = response;
        console.log($scope);
    });
})

.controller('entdeckungsreiseCtrl', function($scope) {

})

.controller('benachrichtigungenCtrl', function($scope) {

})

.controller('aufgabenCtrl', function($scope) {

})

.controller('loginCtrl', function($scope, UserDataService) {

	// Get the user from a authentication service before (basic auth)
	/*
	UserDataService.getUserById(2).then(
		function($res){
			console.log($res.data);
		},
		function($error){
			console.log($error);
		}
	);
	*/
})

.controller('registrierungCtrl', function($scope) {

})

.controller('organisationCtrl', function($scope) {

})

.controller('meinProfilCtrl', function($scope) {

})

.controller('projekteCtrl', function($scope) {

})

.controller('gelSchteAufgabenCtrl', function($scope) {

})

.controller('einstellungenCtrl', function($scope) {

})

.controller('LoginCtrl', function ($window,$scope,$location, $route, AuthenticationService,FlashService) {




	/*
	 * ---------------------------
    *      LOGIN SERVER
	 * ---------------------------


    $scope.logout = function () {
        // reset login status
        AuthenticationService.ClearCredentials();
        AuthenticationService.Logout();
        $location.path('/user');
        $window.location.reload();
    };

    $scope.loggedIn = $scope.globals.currentUser;


    $scope.login = function login(){
        console.log("in login");
        console.log($scope);

        $scope.dataLoading = true;

        //debugger;
        AuthenticationService.Login($scope.username, $scope.password, function (response) {
            if (response.success) {
                console.log("in login - AuthenticationService.Login == successed");
                console.log("Response: "+response);
                //AuthenticationService.SetCredentials($scope.username, $scope.password);
                $scope.loggedIn = true;

                FlashService.Success("Eingeloggt!");

                if($scope.globals.currentUser.isAdmin)
                    $location.path('/user');
                else
                    $location.path('/failed');

                $window.location.reload();
            } else {
                console.log("in login - AuthenticationService.Login == failed");
                FlashService.Error(response.message);
                $scope.dataLoading = false;
                $scope.loggedIn = false;
            }
        });
        console.log("in login - AuthenticationService.Login == passed");
    };
	 */
})

.controller('MainCtrl', function($scope, webtest) {
    webtest.fetch().then(function(data) {
        $scope.data = data;
    })
});

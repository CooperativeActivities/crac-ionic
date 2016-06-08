angular.module('app.controllers', [])
	
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider) {
	// tab bar android to bottom (default: top)
	$ionicConfigProvider.tabs.position('bottom');

	//allow youtube videos
	$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
})

.controller('neuigkeitenCtrl', function($scope, $http) {
    $http.get('data/project_tasklist_dummy.json').success(function(data) {

        var newsList = [];

        angular.forEach(data, function(item){
            angular.forEach(item.childTasks, function(item){
                newsList.push(item);
            })
        })

        $scope.newsList = newsList;
    });
        
})

.controller('entdeckungsreiseCtrl', function($scope) {

})

.controller('benachrichtigungenCtrl', function($scope) {

})

.controller('aufgabenCtrl', function($scope) {

})

.controller('loginCtrl', function($scope, $http, $location, UserDataService, $ionicSideMenuDelegate) {

	// deactivate swipe possibility (for sidebar)
	$ionicSideMenuDelegate.canDragContent(false);

	$scope.checkLogin = function(email, password) {

		// Check if demo-user (frontend@test.at; frontendKey)
		if(email === "frontend@test.at" &&
			password === "frontendKey")
		{

			// Get visual error msg
			$scope.hasWrongCredentials = false;

			// Get local JSON
			$http.get('data/login_dummy.json').success(function(data) {
				$scope.login = data;
			});

			// Switch to desired location
			$location.path("/tabs/footer_news");
		}
		else {
			$scope.hasWrongCredentials = true;
		}
	}

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



.controller('meinProfilCtrl', function($scope, $http) {

	// Get local JSON
	$http.get('data/user_dummy.json').success(function(data) {
   	    $scope.user = data;
	});

})

.controller('projekteCtrl', function($scope, $http) {

    $http.get('data/project_tasklist_dummy.json').success(function(data) {
        $scope.projectList = data;
    });
})

.controller('gelSchteAufgabenCtrl', function($scope) {

})

.controller('einstellungenCtrl', function($scope) {

})

.controller('LoginCtrl', function ($window, $scope, $location, $route, AuthenticationService, FlashService) {





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

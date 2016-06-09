angular.module('app.controllers', [])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider) {
	// tab bar android to bottom (default: top)
	$ionicConfigProvider.tabs.position('bottom');

	//allow youtube videos
	$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
})

.controller('neuigkeitenCtrl', function($scope, $http) {

    //SHOW ALL NEW TASKS FROM ORGANISATION

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

    //SHOW CHANGES OF FOLLOWED AND ACCEPTED TASKS FROM USER

})

.controller('aufgabenCtrl', function($scope, $http) {


    //SHOW ALL ACCEPTED TASKS FROM USER

    $http.get('data/project_tasklist_dummy.json').success(function(data) {
        var taskList = [];
        angular.forEach(data, function(item){
            angular.forEach(item.childTasks, function(item){
                taskList.push(item);
            })
        })

        $scope.taskList = taskList;
    });
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

.controller('organisationCtrl', function($scope, $http) {

	// REST-Call: /projects
	// Display ALL projects. In this domain we haven't modelled organizations, so every
	// project belongs to this organization.
	// Further: Because images aren't handled in the backend, i manipulated the json
	// a bit and added a local imagepath.
	// Additional further: CUrrently a task does NOT have a "fullfilled" state, so
	// when this task is marked as complete --> also added in dummy json

	// Init (show opened tasks)
	$scope.showOpenProjects = true;

	// Get local JSON
	$http.get('data/organisation_projects.json').success(function(data) {

		 $scope.projects = data;

		 // Go through childtasks PER PROJECT and get completed tasks
		 for (var i = 0; i < $scope.projects.length; i++) {

			var completedTaskCount = 0;
			var currentProject = $scope.projects[i];
			var currentChildTasks = currentProject.childTasks;
			currentProject.maxTasks = currentChildTasks.length;

			// Go through childtasks
			for (var j = 0; j < currentChildTasks.length; j++) {
				if(currentChildTasks[j].completed) {
					completedTaskCount++;
				}
			}

			// Set a project-is-completed flag if all subtasks are completed
			if(completedTaskCount === currentProject.maxTasks) {
				currentProject.isCompleted = true;
			} else {
				currentProject.isCompleted = false;
			}

			// Assign count
			currentProject.completedTasks = completedTaskCount;
		 }

		 // Add projects depending on their completed-status to the scope.
		 // Maybe for Refactoring only these two arrays
		 // instead of the projects-Array with all projects
		 getOpenProjects();
		 getCompletedProjects();
	});

	var getOpenProjects = function() {

		// Returns all projects with no completed flag
		var openProjects = [];

		for (var i = 0; i < $scope.projects.length; i++) {
			if(!$scope.projects[i].isCompleted) {
				openProjects.push($scope.projects[i]);
			}
		}

		$scope.openProjects = openProjects;
	};

	var getCompletedProjects = function() {

		// Returns all projects with a completed flag
		var completedProjects = [];

		for (var i = 0; i < $scope.projects.length; i++) {
			if($scope.projects[i].isCompleted) {
				completedProjects.push($scope.projects[i]);
			}
		}

		$scope.completedProjects = completedProjects;
	};

	$scope.displayCompletedProjects = function() {

		// Helper-Flags to determine which projects should be shown
		$scope.showCompletedProjects = true;
		$scope.showOpenProjects = false;
	};

	$scope.displayOpenProjects = function() {
		$scope.showCompletedProjects = false;
		$scope.showOpenProjects = true;
	};

})



.controller('meinProfilCtrl', function($scope, $http) {

	// Get local JSON
	$http.get('data/user_dummy.json').success(function(data) {
   	    $scope.user = data;
	});

})

.controller('projektCtrl', function($scope, $http, $stateParams) {

	// Refactoring: changed from "projekteCtrl" to "projektCtrl"
	// This Ctrl is only responsible to show the details of a project
	// --> childtasks, metadata like date and location and so on

	// IF REST is used, just call the endpoint with the desired project-id
	// In this demo-case, all dummy projects are searched for a matching id (url and json)

   $http.get('data/project_tasklist_dummy.json').success(function(data) {

	   var projectId = $stateParams.projectId;

		// Search matching project id
		for (var i = 0; i < data.length; i++) {
			if(data[i].id = projectId) {
				$scope.project = data[i];
				return;
			}
		}
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

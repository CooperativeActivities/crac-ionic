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
                item.projectId = item.id;
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
                item.projectId = item.id;
                taskList.push(item);
            })
        })

        $scope.taskList = taskList;
        console.log($scope);
    });
})

.controller('neueAufgabeCtrl', function($scope, $http, $stateParams) {
        var projectId = parseInt($stateParams.projectId)



        $http.get('data/project_tasklist_dummy.json').success(function(data) {

            var projectId = parseInt($stateParams.projectId);

            // Search matching project id
            for (var i = 0; i < data.length; i++) {
                if(data[i].id === projectId) {
                    $scope.project = data[i];
                    console.log($scope);
                    return;
                }
            }
        });

        $scope.curDateTime = new Date();

})

.controller('aufgabeBearbeitenCtrl', function($scope, $http, $stateParams) {

    $http.get('data/project_tasklist_dummy.json').success(function(data) {

        var projectId = parseInt($stateParams.projectId);
        var taskId = parseInt($stateParams.taskId);

        // Search matching project id
        for (var i = 0; i < data.length; i++) {
            if(data[i].id === projectId) {
                var curProjectTasks = data[i].childTasks;

                for(var j=0; j < curProjectTasks.length; j++)
                {
                    if(curProjectTasks[j].id === taskId)
                    {
                        $scope.task = curProjectTasks[j];
                    }
                }
                console.log($scope);
                return;
            }
        }
    });

    $scope.curDateTime = new Date();

})

.controller('aufgabeDetailCtrl', function($scope, $http, $stateParams) {

    $http.get('data/project_tasklist_dummy.json').success(function(data) {

        var projectId = parseInt($stateParams.projectId);
        var taskId = parseInt($stateParams.taskId);

        // Search matching project id
        for (var i = 0; i < data.length; i++) {
            if(data[i].id === projectId) {
                var curProjectTasks = data[i].childTasks;

                for(var j=0; j < curProjectTasks.length; j++)
                {
                    if(curProjectTasks[j].id === taskId)
                    {
                        $scope.task = curProjectTasks[j];
                    }
                }
                console.log($scope);
                return;
            }
        }
    });

    $scope.curDateTime = new Date();

})






.controller('registrierungCtrl', function($scope, $location) {
	$scope.checkRegister = function() {

		console.log("checkRegister Form");

		// Switch to desired location
		$location.path("/tabs/footer_news");
	}
})

.controller('projectsCtrl', function($scope, $http) {

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








.controller('projektCtrl', function($scope, $http, $stateParams) {

	// Refactoring: changed from "projekteCtrl" to "projektCtrl"
	// This Ctrl is only responsible to show the details of a project
	// --> childtasks, metadata like date and location and so on

	// IF REST is used, just call the endpoint with the desired project-id
	// In this demo-case, all dummy projects are searched for a matching id (url and json)

	// Init active buttons
	$scope.showAllTasks = true;

   $http.get('data/project_tasklist_dummy.json').success(function(data) {

	   var projectId = parseInt($stateParams.projectId);

		// Search matching project id
		for (var i = 0; i < data.length; i++) {
			if(data[i].id === projectId) {
				$scope.project = data[i];
                $scope.project.isAdmin = true;
				// Customize startTime
				var startTimeCustomized = $scope.project.startTime.substring(0, 10).split("-");
				$scope.project.startTimeCustomized = startTimeCustomized[2] + "." + startTimeCustomized[1] + "." + startTimeCustomized[0];

				// Add completed tasks to scope
				getCompletedTasks();

                console.log($scope);
				return;
			}
		}

   });

	$scope.displayAllTasks = function() {

		// Helper-Flags to determine which tasks should be shown
		$scope.showAllTasks = true;
		$scope.showCompletedTasks = false;
		$scope.showAssignedTasks = false;
	};

	$scope.displayCompletedTasks = function() {

		// Helper-Flags to determine which tasks should be shown
		$scope.showAllTasks = false;
		$scope.showCompletedTasks = true;
		$scope.showAssignedTasks = false;
	};

	$scope.displayAssignedTasks = function() {

		// Helper-Flags to determine which projects should be shown
		$scope.showAllTasks = false;
		$scope.showCompletedTasks = false;
		$scope.showAssignedTasks = true;
	};

	var getCompletedTasks = function() {

		// Returns all projects with a completed flag
		var completedTasks = [];

		for (var i = 0; i < $scope.project.childTasks.length; i++) {
			if($scope.project.childTasks[i].completed) {
				completedTasks.push($scope.project.childTasks[i]);
			}
		}

		if(completedTasks.length > 0) {
			$scope.project.hasCompletedTasks = true;
			$scope.project.completedTasks = completedTasks;
		} else {
			$scope.project.hasCompletedTasks = false;
		}
	};
})

.controller('umgebungCtrl', function($scope) {

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

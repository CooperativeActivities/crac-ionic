/**
 * Created by P23460 on 09.08.2016.
 */
cracApp.controller('loginCtrl', function($scope, $http, $location, UserDataService, AuthenticationService, $ionicSideMenuDelegate) {

    // deactivate swipe possibility (for sidebar)
    $ionicSideMenuDelegate.canDragContent(false);

    $scope.checkLogin = function login(username,password){
        console.log("in login");
        $scope.dataLoading = true;
        $location.path("/tabs/footer_news");
        /*AuthenticationService.Login(username, password, function (response) {
            if (response.success) {
                //AuthenticationService.SetCredentials($scope.username, $scope.password);
                $scope.loggedIn = true;
                $scope.hasWrongCredentials = false;
                $location.path("/tabs/footer_news");
                //$window.location.reload();
            } else {
                FlashService.Error(response.message);
                $scope.dataLoading = false;
                $scope.loggedIn = false;
                $scope.hasWrongCredentials = true;
            }
        });'*/
    };

    //$scope.checkLogin = function(username, password) {

        // Get the user from a authentication service before (basic auth)
        /*
         UserDataService.getUserLogin().then(
         function($res){
         console.log($res.data);
         },
         function($error){
         console.log($error);
         }
         );



         AuthenticationService.Login(username, password, function (response) {
         if (response.success) {

         //AuthenticationService.SetCredentials($scope.username, $scope.password);

         // Set variables according if shop user or admin
         setUserData();

         $scope.loggedIn = true;
         $scope.loginError = undefined;

         $scope.isAdmin ? $location.path('/admin/books') : $location.path('/books');

         $window.location.reload();
         } else {
         var msg = response.message;

         $scope.loginError = msg;
         $scope.dataLoading = false;
         $scope.loggedIn = false;

         $location.path("/books");
         }
         });

         */


        // Check if demo-user (frontend@test.at; frontendKey)
       /* if(username === "frontend" &&
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
        } */
    //}
})
/**
 * Created by P23460 on 09.08.2016.
 */
cracApp.controller('loginCtrl', function($scope, $http, $location, UserDataService, AuthenticationService, $ionicSideMenuDelegate) {

    // deactivate swipe possibility (for sidebar)
    $ionicSideMenuDelegate.canDragContent(false);

    $scope.checkLogin = function login(username,password){
        console.log("in login");
        $scope.dataLoading = true;
        AuthenticationService.Login(username, password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials(username, password,response.id);
                $scope.loggedIn = true;
                $scope.hasWrongCredentials = false;
                $location.path("/tabs/footer_notifications");
            } else {
                FlashService.Error(response.message);
                $scope.dataLoading = false;
                $scope.loggedIn = false;
                $scope.hasWrongCredentials = true;
            }
        });
    };
})
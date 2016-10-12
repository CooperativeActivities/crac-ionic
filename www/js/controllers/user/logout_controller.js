/**
 * Created by p23460 on 12.10.2016.
 */
cracApp.controller('logoutCtrl', function($scope, $ionicModal) {

    // Logout Modal
    $ionicModal.fromTemplateUrl('logout-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };


    $scope.logout = function(){
        console.log("logout");
        $location.path("/login");
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
})

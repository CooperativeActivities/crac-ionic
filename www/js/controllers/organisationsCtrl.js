/**
 * Created by p23460 on 14.09.2016.
 */
cracApp.controller('organisationsCtrl', function($scope,OrganisationService) {

    $scope.organsations = OrganisationService.getOrganisationsForUser("todo");
    console.log($scope.organsations);

    $scope.addOrganisation = function login(){
        console.log("In add Org");
    }

    $scope.changeNotification = function(orgId, enabled){
        console.log("Notification for " + orgId + " is enabled: " + enabled);
        OrganisationService.changeNotification(orgId,enabled);
    }
});
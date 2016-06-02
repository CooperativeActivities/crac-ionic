angular.module('app.controllers', [])

.controller('neuigkeitenCtrl', function($scope) {

})

.controller('entdeckungsreiseCtrl', function($scope) {

})

.controller('benachrichtigungenCtrl', function($scope) {

})

.controller('aufgabenCtrl', function($scope) {

})

.controller('loginCtrl', function($scope, UserDataService) {

	var user =
	{
		// Get the user from a authentication service (FABIAN)
	};

	UserDataService.getUserLogin(user).then(
		function($res){
			console.log($res.data);

		},
		function($error){
			console.log($error);
		}
	);
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

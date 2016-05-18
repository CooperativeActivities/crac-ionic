angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.neuigkeiten', {
    url: '/footer_news',
    views: {
      'tab1': {
        templateUrl: 'templates/neuigkeiten.html',
        controller: 'neuigkeitenCtrl'
      }
    }
  })

  .state('entdeckungsreise', {
    url: '/login_explore',
    templateUrl: 'templates/entdeckungsreise.html',
    controller: 'entdeckungsreiseCtrl'
  })

  .state('tabsController.benachrichtigungen', {
    url: '/footer_notifications',
    views: {
      'tab2': {
        templateUrl: 'templates/benachrichtigungen.html',
        controller: 'benachrichtigungenCtrl'
      }
    }
  })

  .state('tabsController.aufgaben', {
    url: '/footer_tasks',
    views: {
      'tab3': {
        templateUrl: 'templates/aufgaben.html',
        controller: 'aufgabenCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('registrierung', {
    url: '/register',
    templateUrl: 'templates/registrierung.html',
    controller: 'registrierungCtrl'
  })

  .state('organisation', {
    url: '/sidemenu_organisation',
    templateUrl: 'templates/organisation.html',
    controller: 'organisationCtrl'
  })

  .state('meinProfil', {
    url: '/sidemenu_userprofile',
    templateUrl: 'templates/meinProfil.html',
    controller: 'meinProfilCtrl'
  })

  .state('projekte', {
    url: '/sidemenu_projects',
    templateUrl: 'templates/projekte.html',
    controller: 'projekteCtrl'
  })

  .state('gelSchteAufgaben', {
    url: '/sidemenu_deletedTasks',
    templateUrl: 'templates/gelSchteAufgaben.html',
    controller: 'gelSchteAufgabenCtrl'
  })

  .state('einstellungen', {
    url: '/sidemenu_settings',
    templateUrl: 'templates/einstellungen.html',
    controller: 'einstellungenCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});
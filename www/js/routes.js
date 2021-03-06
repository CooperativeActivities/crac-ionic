angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    //shows the login screen
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })



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



  .state('registrierung', {
    url: '/register',
    templateUrl: 'templates/registrierung.html',
    controller: 'registrierungCtrl'
  })

  .state('neueAufgabe', {
      url: '/:projectId/neueAufgabe',
      templateUrl: 'templates/neueAufgabe.html',
      controller: 'neueAufgabeCtrl'
  })

  .state('aufgabeBearbeiten', {
      url: '/task/edit/:projectId/:taskId',
      templateUrl: 'templates/aufgabeBearbeiten.html',
      controller: 'aufgabeBearbeitenCtrl'
  })

  .state('aufgabeDetail', {
      url: '/task/detail/:projectId/:taskId',
      templateUrl: 'templates/aufgabeDetail.html',
      controller: 'aufgabeDetailCtrl'
  })

  .state('projects', {
    url: '/sidemenu_projects',
    templateUrl: 'templates/projects.html',
    controller: 'projectsCtrl'
  })

    .state('organisation', {
      url: '/sidemenu_organisation',
      templateUrl: 'templates/organisations.html',
      controller: 'organisationsCtrl'
    })

  .state('meinProfil', {
    url: '/sidemenu_userprofile',
    templateUrl: 'templates/meinProfil.html',
    controller: 'meinProfilCtrl'
  })

  .state('projekt', {
    url: '/sidemenu_projects/:projectId',
    templateUrl: 'templates/projekt.html',
    controller: 'projektCtrl'
  })

  .state('umgebung', {
    url: '/sidemenu_umgebung',
    templateUrl: 'templates/umgebung.html',
    controller: 'umgebungCtrl'
  })

  .state('einstellungen', {
    url: '/sidemenu_settings',
    templateUrl: 'templates/einstellungen.html',
    controller: 'einstellungenCtrl'
  })

	$urlRouterProvider.otherwise('/login')
});

var app = angular.module('app', ['ui.router', 'restangular', 'Devise'])

// .config(["RestangularProvider", function(RestangularProvider){
//   RestangularProvider.setBaseUrl("/api/v1")
//   RestangularProvider.setRequestSuffix(".json")

// }])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: 'templates/session/login.html',
        controller: 'SessionCtrl'
      })
      .state('loggedIn', {
        url: "/loggedIn",
        templateUrl: 'templates/session/temp.html',
        controller: 'SessionCtrl'
      })

      .state('board', {
        url: '/board',
        views: {
          'layout': {
            templateUrl: 'templates/boards/layout.html',
            controller: 'BoardsCtrl'
          }
          'child': {
            templateUrl: 'templates/boards/child.html',
          }
        }
      })
  }])

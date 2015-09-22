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
  }])

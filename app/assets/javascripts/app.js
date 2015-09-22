var app = angular.module('app', ['ui.router', 'restangular', 'Devise'])

.config(["RestangularProvider", function(RestangularProvider){
  RestangularProvider.setBaseUrl("/api/v1")
  RestangularProvider.setRequestSuffix(".json")

}])

.config(["AuthInterceptProvider", function(AuthInterceptProvider) {
  // Intercept 401 Unauthorized everywhere
  AuthInterceptProvider.interceptAuth(true);
}])

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
        templateUrl: 'templates/boards/layout.html',
        controller: 'BoardCtrl',
      })

      .state('board.create', {
        url: '/create',
        templateUrl: 'templates/boards/create.html',
        controller: 'BoardCreateCtrl',
      })
  }])

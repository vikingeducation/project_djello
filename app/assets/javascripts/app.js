var app = angular.module('app', ['ui.router', 'restangular', 'Devise'])

.config(["RestangularProvider", function(RestangularProvider){
  RestangularProvider.setBaseUrl("/api/v1")
  RestangularProvider.setRequestSuffix(".json")

}])

.config(function(AuthProvider) {
  AuthProvider.loginPath('/api/v1/users/sign_in.json');
})

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
        url: "/",
        views: {
          "login": {
            templateUrl: 'templates/auth/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
  }])

var djello = angular.module("djello", ['ui.router', 'Devise', 'restangular', 'angularModalService'])

.config(['RestangularProvider', function(RestangularProvider){

RestangularProvider.setBaseUrl('/api/v1/');
RestangularProvider.setRequestSuffix('.json');

}])


.config(function(AuthProvider) {
  // AuthProvider.registerPath('api/v1/users.json');
})

.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: "/home",
      views: {
        "navbar": {
          templateUrl: "templates/_navbar.html",
          controller: 'navbarCtrl'
        },
        "main": {
          templateUrl: "templates/_main.html"
        }
      }
    })
    .state('home.boards', {
      url: "/boards",
      templateUrl: "templates/boards.html",
      controller: 'boardCtrl'
    })

    .state('home.lists', {
      url: "/boards/:id",
      templateUrl: 'templates/lists.html',
      controller: 'listCtrl'

    })
    .state('home.signup', {
      url: "/signup",
      templateUrl: "templates/sign_up.html",
      controller: "signUp"
    })

}])
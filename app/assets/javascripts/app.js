var djello = angular.module("djello", ['ui.router', 'Devise', 'restangular'])

.config(['RestangularProvider', function(RestangularProvider){

RestangularProvider.setBaseUrl('/api/v1/')
RestangularProvider.setRequestSuffix('.json')

}])


.config(function(AuthProvider) {
  // AuthProvider.registerPath('api/v1/users.json');
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('index', {
      url: "/",
      // templateUrl: 'templates/index.html',
      // controller: function(){},
      views: {
        "": {
          templateUrl: "templates/index.html"
        },
        "navbar": {
          templateUrl: "templates/navbar.html",
          controller: "navbarCtrl"
        },
        "menu": {
          templateUrl: "templates/menu.html"
        }
      }
    })
    .state('sign-up', {
      url: "/sign-up",
      views: {
        "": {
          templateUrl: "templates/sign_up.html",
          controller: "signUp"
        },
        "navbar": {
          templateUrl: "templates/navbar.html",
          controller: "navbarCtrl"
        },
        "menu": {
          templateUrl: "templates/menu.html"
        }
      }
    })

}])
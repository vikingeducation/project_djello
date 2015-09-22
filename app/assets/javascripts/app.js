var djello = angular.module("djello", ['ui.router', 'Devise', 'restangular'])

.config(['RestangularProvider', function(RestangularProvider){

RestangularProvider.setBaseUrl('/api/v1/')
RestangularProvider.setRequestSuffix('.json')

}])

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
          templateUrl: "templates/navbar.html"
        },
        "menu": {
          templateUrl: "templates/menu.html"
        }
      }
    })
    .state('signUp', {
      url: "/signUp",
      views: {
        "": {
          templateUrl: "templates/sign_up.html"
        },
        "navbar": {
          templateUrl: "templates/navbar.html"
        },
        "menu": {
          templateUrl: "templates/menu.html"
        }
      }
    })

}])
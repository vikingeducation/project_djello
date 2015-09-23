var djello = angular.module("djello", ['ui.router', 'Devise', 'restangular'])

.config(['RestangularProvider', function(RestangularProvider){

// RestangularProvider.setBaseUrl('/api/v1/')
RestangularProvider.setRequestSuffix('.json')

}])


.config(function(AuthProvider) {
  // AuthProvider.registerPath('api/v1/users.json');
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('loggedOut', {
      url: "/",
      // templateUrl: 'templates/index.html',
      // controller: function(){},
      views: {

        "": {
          templateUrl: "templates/welcome.html"
        },


      }
    })
    .state('loggedIn', {
      url: "/board",
      // templateUrl: 'templates/index.html',
      // controller: function(){},
      views: {

        "": {
          templateUrl: "templates/board.html",
          controller: 'boardCtrl',
          resolve: {
            boards: ['Restangular', function(Restangular) {
              return Restangular.all('boards').getList()
            }],
            currentUser: ['Auth', function(Auth) {
              return Auth.currentUser();
            }]
          }
        },

      }
    })
    .state('sign-up', {
      url: "/sign-up",
      views: {
        "": {
          templateUrl: "templates/sign_up.html",
          controller: "signUp"
        },


      }
    })

}])
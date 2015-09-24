
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
          templateUrl: "templates/welcome.html",
          // TODO: add ctrl to redirect to state: boards
          // if logged in already

        },


      }
    })
    .state('boards', {
      url: "/boards",
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

    .state('lists', {
      url: "/boards/:id",
      templateUrl: 'templates/list.html',
      controller: 'listCtrl',
      resolve: {
        board: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
          return Restangular.one('boards', $stateParams.id).get()
        }],
        lists: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
          return Restangular.one('boards', $stateParams.id).all('lists').getList()
        }],
        currentUser: ['Auth', function(Auth) {
          return Auth.currentUser();
        }]
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
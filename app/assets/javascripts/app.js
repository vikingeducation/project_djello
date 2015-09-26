var djello = angular.module("djello", ['ui.router', 'Devise', 'restangular'])

.config(['RestangularProvider', function(RestangularProvider){

RestangularProvider.setBaseUrl('/api/v1/');
RestangularProvider.setRequestSuffix('.json');

}])


.config(function(AuthProvider) {
  // AuthProvider.registerPath('api/v1/users.json');
})

.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider){
    // $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('loggedOut', {
      url: "/",
      views: {
        "navbar": {
          templateUrl: "templates/navbar.html",
          controller: 'navbarCtrl'
        },
        "": {
          templateUrl: "templates/layout.html"
        }
      }
    })
    .state('loggedOut.welcome', {
      url: '/welcome',
      templateUrl: 'templates/welcome.html'
    })
    .state('loggedOut.boards', {
      url: "/boards",
      views: {
        "": {
          templateUrl: "templates/board.html",
          controller: 'boardCtrl',
          resolve: {
            boards: ['Restangular', function(Restangular) {
              return Restangular.all('boards').getList()
            }]
          }
        }

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
        boards: ['Restangular', function(Restangular) {
              return Restangular.all('boards').getList()
        }],
        lists: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
          return Restangular.one('boards', $stateParams.id).all('lists').getList()
        }],
        users: ['Restangular', function(Restangular) {
          return Restangular.all('users').getList()
        }]
      }

    })
    .state('sign-up', {
      url: "/sign-up",
      templateUrl: "templates/sign_up.html",
      controller: "signUp"
    })

}])
var app = angular.module('app', ['ui.router', 'restangular', 'Devise', 'ngDraggable', 'angularModalService'])

.config(["RestangularProvider", function(RestangularProvider){
  RestangularProvider.setBaseUrl("/api/v1")
  RestangularProvider.setRequestSuffix(".json")

}])

// .config(["AuthInterceptProvider", function(AuthInterceptProvider) {
//   // Intercept 401 Unauthorized everywhere
//   AuthInterceptProvider.interceptAuth(true);
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
        templateUrl: 'templates/boards/layout.html',
        controller: 'BoardCtrl',
      })

      .state('board.index', {
        url: '/index',
        templateUrl: 'templates/boards/index.html',
        controller: 'BoardIndexCtrl',
      })

      .state('board.create', {
        url: '/create',
        templateUrl: 'templates/boards/create.html',
        controller: 'BoardCreateCtrl',
      })

      .state('board.show', {
        url: '/show/:id',
        templateUrl: 'templates/boards/show.html',
        controller: 'BoardShowCtrl',
        resolve: {
          board: ['Restangular', '$stateParams', '$location',
          function(Restangular, $stateParams, $location){
            return Restangular.one('boards', $stateParams.id).get().then(function(success){
              return success
            }, function(error){
              console.log(error)
              $location.path('/board/index');
            })
          }]
        }
      })
  }])

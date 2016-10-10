var app = angular.module('djelloApp',
['ui.router', 'restangular', 'Devise', 'angularSlideables', 'ngAnimate']);

app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

app.factory('_', ['$window', function($window) {
  return $window._;
}]);

app.config(
  ['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider) {

    // Restangular
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({timeout: 3000});

    $urlRouterProvider.otherwise('/boards');

    $stateProvider
      .state('boards', {
        abstract: true,
      })
      .state('boards.index', {
        url: '/boards',
        views: {
          'index@': {
            templateUrl: 'templates/boards/index.html',
            controller: 'BoardsIndexCtrl'
          }
        },
        resolve: {
          boardsData: ['BoardService', function(BoardService){
            return BoardService.all();
          }],
          usersData: ['UserService', function(UserService) {
            return UserService.all();
          }]
        }
      })
      .state('boards.show', {
        url: '/boards/:id/lists/',
        views: {
          'show@': {
            templateUrl: 'templates/boards/show.html',
            controller: 'BoardShowCtrl'
          }
        },
        resolve: {
          // Always pass down the cached array/object to bind the data in memory.
          currentBoard:
          ['BoardService', '$stateParams', function(BoardService, $stateParams) {
            return BoardService.one($stateParams.id);
          }],
          boardsData:
          ['BoardService', function(BoardService) {
            return BoardService.all();
          }],
          listsCache:
          ['ListService', 'currentBoard', function(ListService, currentBoard) {
            return ListService.all(currentBoard.id);
          }],
          // Database for the Bloodhound engine.
          usersData:
          ['UserService', function(UserService) {
            return UserService.all();
          }]
        }
      });
}]);

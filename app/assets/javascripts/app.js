var app = angular.module('djelloApp',
['ui.router', 'restangular', 'Devise', 'angularSlideables']);

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

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('boards', {
        abstract: true,
      })
      .state('boards.index', {
        url: '/',
        views: {
          'index@': {
            templateUrl: 'templates/boards/index.html',
            controller: 'BoardsIndexCtrl'
          }
        },
        resolve: {
          boards: ['BoardService', function(BoardService){
            return BoardService.all();
          }]
        }
      })
      .state('boards.show', {
        url: '/:id',
        views: {
          'show@': {
            templateUrl: 'templates/boards/show.html',
            controller: 'BoardShowCtrl'
          }
        },
        resolve: {
          currentBoard:
          ['BoardService', '$stateParams', function(BoardService, $stateParams) {
            return BoardService.one($stateParams.id);
          }],
          // boards:
          // ['BoardService', '$stateParams', function(BoardService, $stateParams) {
          //   return BoardService.all();
          // }],
          listsInfo:
          ['ListService', 'currentBoard', function(ListService, currentBoard) {
            return ListService.all(currentBoard.id);
          }]
        }
      });
}]);

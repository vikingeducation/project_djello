var app = angular.module('djelloApp', ['ui.router', 'restangular']);

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
    // RestangularProvider.setBaseUrl('https://api.github.com/users/cjvirtucio87');

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
        }
        // },
        // resolve: {
        //   boards: ['BoardService', function(BoardService){
        //     return BoardService.all();
        //   }]
        // }
      });
}]);

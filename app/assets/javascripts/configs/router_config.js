// ----------------------------------------
// Router
// ----------------------------------------

Djello.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/templates/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          boards: ['BoardService', function(BoardService){
            return BoardService.getBoards();
          }]
        }
      })
      .state('dashboard.show', {
        url: '/:id',
        views: {
          'list@dashboard': {
            templateUrl: '/templates/board_show.html',
            controller: 'BoardShowCtrl',
          }
        },
        resolve: {
          board: ['BoardService', '$stateParams', function(BoardService, $stateParams){
            return BoardService.getBoard($stateParams.id);
          }]
        }
      });
  }]);

Djello.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

Djello.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

Djello.run(['$rootScope', function($rootScope) {
  $rootScope.$on("$stateChangeError", console.error.bind(console));
}]);





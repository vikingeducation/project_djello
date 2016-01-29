var djello = angular.module('djello', ['ui.router', 'restangular'])

.config( ['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider) {

  // REST configurations
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    'content-type': 'application/json'
  });

  // Routing
  $urlRouterProvider.otherwise("/boards");

  $stateProvider

    // .state('angularTest', {
    //   url: '',
    //   templateUrl: '/templates/angular.html',
    //   controller: function($scope) {
    //     $scope.test = "hello, world!";
    //   }
    // })

    .state('boards', {
      url: '/boards',
      templateUrl: '/templates/boards/layout.html',
      resolve: {
        boards: ['Restangular', function(Restangular) {
          return Restangular.all('boards').getList();
        }]
      }
    })

    .state('boards.show', {
      url: '/:id',
      templateUrl: '/templates/boards/show.html',
      controller: 'BoardsShowCtrl',
      resolve: {
        board: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
          return Restangular.one('boards', $stateParams.id).get();
        }]
      }
    })

}])

djello.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
})
var djello = angular.module('djello', ['ui.router', 'angularModalService', 'restangular'])

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

    .state('boards', {
      url: '/boards',
      templateUrl: '/templates/boards/layout.html',
      controller: 'BoardsCtrl',
      resolve: {
        boards: ['Restangular', function(Restangular) {
          return Restangular.all('boards').getList();
        }],
        users: ['Restangular', function(Restangular) {
          return Restangular.all('users').getList();
        }]
      }
    })

}])

djello.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
})
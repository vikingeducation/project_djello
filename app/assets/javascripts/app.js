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
  $urlRouterProvider.otherwise("/");

  $stateProvider

    .state('angularTest', {
      url: '',
      templateUrl: '/templates/angular.html',
      controller: function($scope) {
        $scope.test = "hello, world!";
      }
    })

}])

djello.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
})
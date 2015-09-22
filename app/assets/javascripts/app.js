var djello = angular.module("djello", ['ui.router', 'Devise', 'restangular'])

.config(['RestangularProvider', function(RestangularProvider){

RestangularProvider.setBaseUrl('/api/v1/')
RestangularProvider.setRequestSuffix('.json')

}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('index', {
      url: "/",
      templateUrl: 'templates/index.html',
      controller: function(){}
    })

}])
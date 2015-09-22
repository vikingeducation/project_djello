djelloApp = angular.module('djelloApp', ['ui.router', 'restangular', 'Devise']);

djelloApp.config(['RestangularProvider', function(RestangularProvider){

   RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({
        "content-type": "application/json"
    });

}]);

djelloApp.config(['$stateProvider', '$urlRouterProvider',
                  function($stateProvider, $urlRouterProvider){

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/home.html'
  });

}]);
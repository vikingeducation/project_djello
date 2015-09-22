var djello = angular.module('djello', ['restangular', 'ui.router', 'Devise']);

djello.config(['RestangularProvider', function(RestangularProvider){
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
}]);

djello.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider){
    $stateProvider
      .state('header', {
        url: '/',
        templateUrl: 'templates/headerLayout.html'
      });


  }]);

//for errors

djello.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
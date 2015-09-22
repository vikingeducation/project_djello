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
        views: {
          'header': {
            templateUrl: 'templates/headerLayout.html',
            controller: 'headerCtrl'
          },
          '' : {
            templateUrl: 'templates/loginForm.html',
            controller: 'headerCtrl',
          }
        }
      })

      .state('board', {
        url: '/board',
        views: {
          'header': {
            templateUrl: 'templates/loggedInHeader.html',
            controller: 'headerCtrl'
          },
          '' : {
            templateUrl: 'templates/boardLayout.html',
            controller: 'boardCtrl',
          }
        }
      })
      .state('board.index', {
        url: '/:id',
        templateUrl: 'templates/boardIndex.html',
        controller: 'boardCtrl'
      });


  }]);

//for errors

djello.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
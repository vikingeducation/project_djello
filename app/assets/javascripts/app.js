var Djello = angular.module('Djello', ['ui.router', 'restangular', 'Devise']);

//enable lodash
Djello.factory('_', [
  '$window',
  function($window) {
    return $window._;
  }
]);

// config restangular
Djello.config([
  'RestangularProvider',
  function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
]);

Djello.config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

Djello.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/boards');

    $stateProvider.state('main', {
      url: '',
      abstract: true,
      views: {
        'nav@': {
          templateUrl: '/templates/shared/navbar.html',
          controller: 'UsersCtrl'
        }
      }
    })
    .state('main.boards', {
      url: '/boards',
      views: {
        'main@': {
          templateUrl: '/templates/boards/index.html',
          controller: 'BoardsCtrl'
        }
      }
    })

  }

])

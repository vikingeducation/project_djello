var Djello = angular.module('Djello', ['ui.router', 'restangular', 'Devise', 'xeditable']);

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
    }).state('main.boards', {
      url: '/boards',
      views: {
        'main@': {
          templateUrl: '/templates/boards/index.html',
          controller: 'BoardsCtrl'
        }
      }
    }).state('main.board', {
      url: '/board/:id',
      views: {
        'main@': {
          templateUrl: '/templates/boards/show.html',
          controller: 'ShowBoardCtrl'
        },
        'lists@main.board': {
          templateUrl: '/templates/lists/show.html',
          controller: 'ShowListCtrl'
        }
      }
    })

  }

])

Djello.run(function(editableOptions, editableThemes) {
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

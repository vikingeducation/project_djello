var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise'])

.config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    'content-type': 'application/json'
  });
}])

.config(
  ["$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]')
      .attr('content');
    $httpProvider
      .defaults
      .headers
      .common['X-CSRF-Token'] = token;
  }])

.config( function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/boards/index')

    $stateProvider
    .state('boards', {
      url: '',
      abstract: true,
      views: {
        'nav@': {
          templateUrl: '/templates/nav.html',
          controller: 'indexBoardsCtrl'
        }
      },
      resolve: {
        boards: ['Restangular',
                function(Restangular) {
                  return Restangular.all('boards').getList();
        }]
      }
    })

    .state('boards.index', {
      url: '/boards/index',
      views: {
        "main@": {
          templateUrl: '/templates/index.html',
          controller: 'indexBoardsCtrl'
        }
      }
    })

    .state('boards.new', {
      url: '/boards/new',
      views: {
        "main@": {
          templateUrl: '/templates/new.html',
          controller: 'newBoardsCtrl'
        }
      }
    })
})
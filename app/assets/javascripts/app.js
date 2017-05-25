var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise', 'angularModalService', 'dndLists'])

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
          templateUrl: '/templates/shared/nav.html',
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
          templateUrl: '/templates/boards/boards_index.html',
          controller: 'indexBoardsCtrl'
        }
      }
    })

    .state('boards.new', {
      url: '/boards/new',
      views: {
        "main@": {
          templateUrl: '/templates/boards/boards_new.html',
          controller: 'newBoardsCtrl'
        }
      }
    })

    .state('boards.show', {
      url: '/boards/:id',
      views: {
        "main@": {
          templateUrl: '/templates/boards/boards_show.html',
          controller: 'showBoardsCtrl'
        },
        "lists@boards.show": {
          templateUrl: '/templates/lists/lists_index.html',
          controller: 'newListsCtrl'
        }
      },
      resolve: {
        board: ['Restangular', '$stateParams',
        function(Restangular, $stateParams) {
          return Restangular.one('boards', $stateParams.id).get();
        }],
        lists: ['listService', 'board',
        function(listService, board) {
          return listService.getAll(board.id);
        }]
      }
    })
})
var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise'])



djello.config(['RestangularProvider', function(RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    "content-type": "application/json"
  });
}])



djello.config(['$urlRouterProvider', '$stateProvider', 'AuthProvider', function($urlRouterProvider, $stateProvider, AuthProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state("boards", {
      url: "/",
      templateUrl: "templates/boards_index.html",
      controller: "BoardsCtrl"
    })
    .state("boards.show", {
      url: "boards/:id",
      templateUrl: "templates/show_board.html"
      // TODO: resolve to get board from API
    })


}]);
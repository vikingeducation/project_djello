var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise'])



djello.config(['RestangularProvider', function(RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    "content-type": "application/json"
  });
}]);


djello.config(function(AuthProvider){
  //AuthProvider.baseUrl('http://localhost:3000/api/v1');
});


djello.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('boards');

  $stateProvider
    .state("boards", {
      url: "/boards",
      templateUrl: "templates/boards_index.html",
      controller: "BoardsCtrl"
    })
    .state("boards.show", {
      url: "/:id",
      templateUrl: "templates/show_board.html"
      // TODO: resolve to get board from API
    })


}]);
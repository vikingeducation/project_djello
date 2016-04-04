var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise', 'xeditable'])


// djello.value('editableOptions', {
//   theme: 'default' // bs3
// })


djello.run(function(editableOptions) {
  editableOptions.theme = 'default';
});



djello.config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    "content-type": "application/json"
  });
}]);



djello.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('boards');

  $stateProvider
    .state("boards", {
      url: "/boards",
      templateUrl: "templates/boards_index.html",
      controller: "BoardsCtrl",
      resolve: {
        currentUser: ['Auth', function(Auth) {
          return Auth.currentUser();
        }]
      }
    })
    .state("boards.new", {
      url: "/new",
      templateUrl: "templates/new_board.html"
    })
    .state("boards.show", {
      url: "/:id",
      templateUrl: "templates/show_board.html"
    })
    .state('boards.show.newlist', {
      url: "/lists/new",
      templateUrl: "templates/new_list.html",
      controller: "ListsCtrl"
    })




}]);
var app = angular.module("djello", ['ui.router', 'restangular', 'angularModalService']);

app.config(function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise("/boards")

  $stateProvider

    .state("boardsIndex", {
      url: "/boards",
      views: {
        "@": {
          templateUrl: "/templates/boards/index.html",
          controller: "BoardsIndexCtrl"
        }
      }
    })

    .state("newBoard", {
      url: "/boards/new",
      views: {
        "@": {
          templateUrl: "/templates/boards/new.html",
          controller: "NewBoardCtrl"
        }
      }
    })

    .state("boardShow", {
      url: "/boards/:id",
      views: {
        "@": {
          templateUrl: "/templates/boards/show.html",
          controller: "BoardShowCtrl"
        }
      },
      resolve: {
        "boards": ["boardsService", function(boardsService) {
          return boardsService.all()
        }]
      }
    })
})

app.config(
  ['RestangularProvider', 
  function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1')
    RestangularProvider.setRequestSuffix('.json')
    RestangularProvider.setDefaultHttpFields({
      "content-type": "application/json"
    })
}])

// ERROR HANDLING
app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
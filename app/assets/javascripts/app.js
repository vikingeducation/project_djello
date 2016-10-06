var app = angular.module("djello", ['ui.router', 'restangular']);

app.config(function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise("/")

  $stateProvider

    .state("main", {
      url: "/",
      views: {
        "@": {
          templateUrl: "/templates/boards/index.html",
          controller: "BoardsIndexCtrl"
        }
      }
    })

    .state("newBoard", {
      url: "/",
      views: {
        "@": {
          templateUrl: "/templates/boards/new.html",
          controller: "NewBoardCtrl"
        }
      }
    })
})

app.config(
  ['RestangularProvider', 
  function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1')
    RestangularProvider.setRequestSuffix('.json')
}])

// ERROR HANDLING
app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
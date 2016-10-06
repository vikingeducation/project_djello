var app = angular.module("djello", ['ui.router', 'restangular']);

app.factory("_", ["$window", function() {
  return $window._
}]);

app.config(function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise("/")

  $stateProvider

    .state("main", {
      url: "/",
      views: {
        "@": {
          templateUrl: "/templates/boards/index.html",
          controller: "BoardsCtrl"
        }
      }
    })

})


app.controller("BoardsCtrl", ["$scope", function($scope) {
  $scope.message = "Hello world"
}])


// ERROR HANDLING
app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
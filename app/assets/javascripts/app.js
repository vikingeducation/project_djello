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


app.controller("BoardsIndexCtrl", ["$scope", function($scope) {
  $scope.message = "Index page"
}])


app.controller("NewBoardCtrl", ["$scope", function($scope) {
  $scope.message = "New board page"
}])


// ERROR HANDLING
app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
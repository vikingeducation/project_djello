var app = angular.module("djello", ['ui.router', 'restangular']);

app.factory("_", ["$window", function() {
  return $window._
}]);

app.config(function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise("/")

  $stateProvider

    .state("main", {
      url: "/",
      template: "<ui-view>To be replaced...</ui-view>",
      controller: function() {
        console.log("controller")
      }
    })

})
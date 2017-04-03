var djello = angular.module('djello', ['ui.router', 'restangular'])

.controller('testCtrl', 
  ["$scope", 
  function($scope) {

    $scope.test = "hello world"
  }])
app.controller("BoardsCtrl", ["$scope", "Restangular", "UserService", "boards", function($scope, Restangular, UserService, boards){
  $scope.boards = boards;
}])
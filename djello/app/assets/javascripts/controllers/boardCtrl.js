djello.controller('boardCtrl', ['$scope', '$location', 'loginService', 'boards' , function($scope, $location, loginService, boards){
  
  $scope.user = loginService.signedInUser.user;
  $scope.boards = boards;
  console.log("boards in ctrl", $scope.boards)
  $scope.cards = ["task1", "task2"];
  $scope.lists = ["list1", "list2"];

}]);

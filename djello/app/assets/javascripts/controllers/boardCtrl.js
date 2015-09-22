djello.controller('boardCtrl', ['$scope', '$location', 'loginService' , function($scope, $location, loginService){
  
  $scope.user = loginService.signedInUser.user;

  $scope.cards = ["task1", "task2"];
  $scope.lists = ["list1", "list2"];

}]);

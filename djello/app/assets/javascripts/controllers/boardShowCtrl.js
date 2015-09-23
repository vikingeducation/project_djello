djello.controller('boardCtrl',
  ['$scope', '$location', '$stateParams','loginService', 'board',
   function($scope, $location, $stateParams, loginService, board){

  $scope.user = loginService.signedInUser.user;


  $scope.board = board;
  $scope.cards = ["task1", "task2"];
  $scope.lists = ["list1", "list2"];

}]);

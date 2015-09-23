djello.controller('boardShowCtrl',
  ['$scope', '$location', '$stateParams','loginService', 'board',
   function($scope, $location, $stateParams, loginService, board){

    console.log("boardShowCtrl initiated")
  $scope.user = loginService.signedInUser.user;


  $scope.board = board.board;

  $scope.lists = board.lists;
  
  console.log("lists", $scope.lists)
  //$scope.cards = ;

}]);

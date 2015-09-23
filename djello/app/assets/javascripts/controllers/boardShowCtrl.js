djello.controller('boardShowCtrl',
  ['$scope', '$location', '$stateParams','loginService', 'showresponse',
   function($scope, $location, $stateParams, loginService, showresponse){

    console.log("boardShowCtrl initiated")
  $scope.user = loginService.signedInUser.user;


  $scope.board = showresponse.board;

  $scope.lists = showresponse.lists;

  console.log("lists", $scope.lists)

  //$scope.cards = ;

}]);

djello.controller('boardShowCtrl',
  ['$scope', '$location', '$stateParams','loginService', 'showresponse',
   function($scope, $location, $stateParams, loginService, showresponse){

    console.log("boardShowCtrl initiated");
  $scope.user = loginService.signedInUser.user;

  // redirect back to root if not signed in
  // if(!$scope.user.user) $location.path('/');

  $scope.board = JSON.parse(showresponse.board);

  $scope.lists = JSON.parse(showresponse.lists);

  console.log("lists", $scope.lists);

  //$scope.cards = ;

}]);

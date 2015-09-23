djello.controller('boardShowCtrl',
  ['$scope', '$location', '$stateParams','loginService', 'showresponse',
   function($scope, $location, $stateParams, loginService, showresponse){

    console.log("boardShowCtrl initiated");
  $scope.user = loginService.signedInUser.user;

  $scope.editorBoardTitle = function(saved){
      $scope.BoardTitleEnabled=!$scope.BoardTitleEnabled
      if (saved == 'saved') {
        Restangular.all('boards').post(
          { board: {  title: 'Default Board Title' ,
                      user_id: $scope.user.id }})
                  .then(function(createdBoard){
                        $scope.boards.push(createdBoard);
                  });
      } else {
        $scope.oldTitle = $scope.BoardTitleEnabled
      }
  } ;


  // redirect back to root if not signed in
  // if(!$scope.user.user) $location.path('/');

  $scope.board = JSON.parse(showresponse.board);

  $scope.lists = JSON.parse(showresponse.lists);

  console.log("lists", $scope.lists);

  //$scope.cards = ;

}]);

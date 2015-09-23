djello.controller('boardShowCtrl',
  ['$scope', '$location', '$stateParams','$document','loginService', 'showresponse', 'Restangular',
   function($scope, $location, $stateParams, $document, loginService, showresponse, Restangular){

    console.log("boardShowCtrl initiated");
  $scope.user = loginService.signedInUser.user;
  var oldTitle = "";
    // redirect back to root if not signed in
  // if(!$scope.user.user) $location.path('/');

  $scope.board = JSON.parse(showresponse.board);

  $scope.lists = JSON.parse(showresponse.lists);

  var clickListener = $document.on('click', function(){
          $scope.BoardTitleEnabled=!$scope.BoardTitleEnabled;
        });

  $scope.editorBoardTitle = function(saved){
      $scope.BoardTitleEnabled=!$scope.BoardTitleEnabled;
      if (saved == 'saved') {
        $scope.board.put().then(function(){
          oldTitle = $scope.BoardTitleEnabled;
        });
        // Restangular.all('boards').post(
        //   { board: {  title: 'Default Board Title' ,
        //               user_id: $scope.user.id }})
        //           .then(function(createdBoard){
        //                 $scope.boards.push(createdBoard);
        //           });
      } elsif (){
        $document.off('click', clickListener);
      } else {
        //when clicking to edit
        oldTitle = $scope.board.title.slice(0);
        // for click outside box;
        clickListener

        //no change, revert back to oldTitle
        $scope.BoardTitleEnabled = oldTitle;
      }
  } ;




  console.log("lists", $scope.lists);

  //$scope.cards = ;

}]);

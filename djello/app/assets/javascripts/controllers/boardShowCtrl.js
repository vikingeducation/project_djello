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



  $scope.editorBoardTitle = function(input){
     
      if (input == 'cancel' && $scope.BoardTitleEnabled) {
        $scope.board.title = oldTitle;
      }
      else if (input == 'saved' && $scope.BoardTitleEnabled){
        Restangular.one('boards', $scope.board.id).put();
        
    
      }
      oldTitle = $scope.board.title;
      $scope.BoardTitleEnabled=!$scope.BoardTitleEnabled;
      //   $document.off('click', clickListener);

      // } else if (saved != 'saved' && $scope.BoardTitleEnabled){
      //   $document.off('click', clickListener);


      //   //no change, revert back to oldTitle
      //   $scope.BoardTitleEnabled = oldTitle;

      // } else {
      //   //when clicking to edit
      //   oldTitle = $scope.board.title;
      //   // for click outside box;
      //   clickListener;

      // }
  };




  console.log("lists", $scope.lists);

  //$scope.cards = ;

}]);

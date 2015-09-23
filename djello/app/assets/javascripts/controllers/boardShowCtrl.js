djello.controller('boardShowCtrl',
  ['$scope', '$location', '$stateParams','$document','loginService', 'showresponse', 'Restangular', 'dataService',
   function($scope, $location, $stateParams, $document, loginService, showresponse, Restangular, dataService){

    console.log("boardShowCtrl initiated");
  $scope.user = loginService.signedInUser.user;
  var oldTitle = "";

  $scope.board = JSON.parse(showresponse.board);
  $scope.lists = JSON.parse(showresponse.lists);

  // ==============all board methods===============

  $scope.deleteBoard = function(){
    Restangular.one('boards', $scope.board.id).remove();
    dataService.deleteBoard($scope.board);
    $location.path('/board');
  };

  $scope.editorBoardTitle = function(input){

      if (input == 'cancel' && $scope.BoardTitleEnabled) {
        $scope.board.title = oldTitle;
      }
      else if (input == 'saved' && $scope.BoardTitleEnabled){
        var oldboard = Restangular.one('boards', $scope.board.id);
        oldboard.title = $scope.board.title;
        oldboard.put().then(
          dataService.updateBoard(oldboard)
          );
      }
      oldTitle = $scope.board.title;
      $scope.BoardTitleEnabled=!$scope.BoardTitleEnabled;

  };

  // ==============all list methods===============

  $scope.newList = function(){
    console.log('list create');
    Restangular.all('lists').post(
          { list: {  title: 'Blank List' ,
                    description: 'insert description here',
                    board_id: $scope.board.id }})
              .then(function(createdList){
                $scope.lists.push(createdList);
                  });
  };

  console.log("lists", $scope.lists);

  //$scope.cards = ;

}]);

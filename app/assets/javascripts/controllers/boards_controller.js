djello.controller('BoardsCtrl', ['$scope', '$state', 'BoardsService', 'currentUser', function($scope, $state, BoardsService, currentUser) {


  $scope.boards;
  $scope.formData = {};


  BoardsService.getBoardsForUser(currentUser).then(
    function(data) {
      $scope.boards = data.boards;
    });


  $scope.changeState = function(board) {
    console.log(board)
    console.log("board id: " + board.id)
    $state.go('boards.show', { id: board.id })
  }

  $scope.createBoard = function(formIsValid) {
    if (formIsValid) {
      $scope.formData["user_id"] = currentUser.id;
      var board = BoardsService.createBoard($scope.formData);
      $scope.boards.push(board);
      console.log($scope.formData)
      $scope.formData = {};
      console.log($scope.formData)
    }
  }



}]);

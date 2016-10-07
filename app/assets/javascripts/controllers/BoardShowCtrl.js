app.controller("BoardShowCtrl", ["$stateParams", "$state", "$scope", "_", "boardsService", "boards", "listsService", function($stateParams, $state, $scope, _, boardsService, boards, listsService) {
  $scope.message = "Board Show"

  $scope.boards = boards
  $scope.board = boardsService.find($stateParams.id)
  console.log($scope.board)

  listsService.all($scope.board).then(function(response) {
    $scope.lists = response
  })

  $scope.selectedBoard = $scope.selectedBoard || $scope.board

  $scope.deleteBoard = function() {
    $scope.board.remove();
    $state.go("boardsIndex")
  }
  $scope.switchBoards = function() {
    console.log("going to board " + $scope.selectedBoard.title)
    return $state.go("boardShow", {id: $scope.selectedBoard.id})
  }
  $scope.showNewList = false; 

  $scope.newList = function() {
    $scope.showNewList = true
    $scope.newList = {}
  }


  $scope.makeNewList = function() {
    // submit newList object as params to listsService.create
    // reset newList to blank object
    listsService.create($scope.board, $scope.newList)
    $scope.newList = {}
  }
}])
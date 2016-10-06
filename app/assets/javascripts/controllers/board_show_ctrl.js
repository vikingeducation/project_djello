app.controller('BoardShowCtrl',
['BoardService', '$scope', 'currentBoard', '$stateParams',
function(BoardService, $scope, currentBoard, $stateParams) {

  console.log(currentBoard);
  $scope.currentBoard = currentBoard;

}]);

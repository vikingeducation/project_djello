app.controller('BoardShowCtrl',
['BoardService', '$scope', 'currentBoard', function(BoardService, $scope, board) {

  $scope.currentBoard = currentBoard;

}]);

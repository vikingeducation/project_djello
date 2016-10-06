app.controller('BoardShowCtrl',
['BoardService', '$scope', 'currentBoard', function(BoardService, $scope, currentBoard) {

  $scope.currentBoard = currentBoard;

}]);

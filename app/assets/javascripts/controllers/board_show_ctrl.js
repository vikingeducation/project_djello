app.controller('BoardShowCtrl',
['BoardService', '$scope', 'currentBoard', '$stateParams',
function(BoardService, $scope, currentBoard, $stateParams) {

  $scope.currentBoard = currentBoard;

}]);

app.controller('BoardShowCtrl',
['BoardService', '$scope', 'currentBoard', '$stateParams',
function(BoardService, $scope, currentBoard, $stateParams) {

  $scope.currentBoard = currentBoard;
  $scope.$on('boards.changeSelected', function(newSelected) {
    $scope.go('boards', {id: newSelected.id});
  });

}]);

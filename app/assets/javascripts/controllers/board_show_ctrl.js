app.controller('BoardShowCtrl',
['BoardService', '$scope', 'currentBoard', '$stateParams',
'$state',
function(BoardService, $scope, currentBoard, $stateParams, $state) {

  $scope.currentBoard = currentBoard;
  $scope.$on('boards.changeSelected', function(ev, newSelected) {
    $state.go('boards.show', {id: newSelected.id});
  });

}]);

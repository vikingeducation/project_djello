app.controller('BoardShowCtrl',
['BoardService', '$scope', 'currentBoard', '$stateParams',
'$state', 'listsInfo',
function(BoardService, $scope, currentBoard, $stateParams, $state, listsInfo) {

  $scope.listsInfo = listsInfo;
  $scope.currentBoard = currentBoard;
  $scope.$on('boards.changeSelected', function(ev, newSelected) {
    $state.go('boards.show', {id: newSelected.id});
  });

}]);

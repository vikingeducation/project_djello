app.controller('BoardShowCtrl',
['BoardService',
'$scope',
'currentBoard',
'$state',
'listsInfo',
'boards',
function(
  BoardService,
  $scope,
  currentBoard,
  $state,
  listsInfo,
  boards) {

  $scope.listsInfo = listsInfo;
  $scope.currentBoard = currentBoard;
  $scope.boards = boards;
  $scope.$on('boards.changeSelected', function(ev, newSelected) {
    $state.go('boards.show', {id: newSelected.id});
  });

}]);

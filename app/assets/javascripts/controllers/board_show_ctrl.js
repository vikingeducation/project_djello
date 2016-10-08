app.controller('BoardShowCtrl',
['BoardService',
'$scope',
'currentBoard',
'$state',
'listsCache',
'boardsCache',
function(
  BoardService,
  $scope,
  currentBoard,
  $state,
  listsCache,
  boardsCache) {

  $scope.listsCache = listsCache;
  $scope.currentBoard = currentBoard;
  $scope.boardsCache = boardsCache;
  $scope.$on('boards.changeSelected', function(ev, newSelected) {
    $state.go('boards.show', {id: newSelected.id});
  });

}]);

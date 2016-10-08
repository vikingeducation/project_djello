app.controller('BoardShowCtrl',
['BoardService',
'$scope',
'currentBoard',
'$state',
'listsCache',
'boardsCache',
'usersCache',
function(
  BoardService,
  $scope,
  currentBoard,
  $state,
  listsCache,
  boardsCache,
  usersCache) {

  $scope.currentBoard = currentBoard;
  $scope.listsCache = listsCache;
  $scope.boardsCache = boardsCache;
  $scope.usersCache = usersCache;

  $scope.$on('boards.changeSelected', function(ev, newSelected) {
    $state.go('boards.show', {id: newSelected.id});
  });

}]);

app.controller('BoardShowCtrl',
['BoardService',
'$scope',
'currentBoard',
'$state',
'listsCache',
'boardsData',
'usersData',
function(
  BoardService,
  $scope,
  currentBoard,
  $state,
  listsCache,
  boardsData,
  usersData) {

  $scope.currentBoard = currentBoard;
  $scope.listsCache = listsCache;
  $scope.boardsData = boardsData;
  $scope.usersData = usersData;

  $scope.$on('boards.changeSelected', function(ev, newSelected) {
    $state.go('boards.show', {id: newSelected.id});
  });

}]);

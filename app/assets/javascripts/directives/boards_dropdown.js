app.directive('boardsDropdown',
['BoardService', function(BoardService) {

  return {
    templateUrl: 'templates/directives/boards_dropdown.html',
    restrict: 'E',
    scope: {},
    link: function(scope) {
      scope.boards = BoardService.currentUserBoards();
      scope.changeShowBoard = function () {
        return scope.$emit('boards.changeSelected', scope.selectedBoard);
      };
    }
  };

}]);

app.directive('boardsDropdown',
['BoardService', function(BoardService) {

  return {
    templateUrl: 'templates/directives/boards_dropdown.html',
    restrict: 'E',
    link: function(scope) {
      scope.boards = BoardService.currentUserBoards();
    }
  };

}]);

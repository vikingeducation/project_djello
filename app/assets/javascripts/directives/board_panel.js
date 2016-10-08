app.directive('boardPanel',
['BoardService', 'ListService',
function(BoardService, ListService) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/board_panel.html',
    scope: {
      board: '='
    },
    link: function(scope) {
      scope.storeBoardLists = function(data) {
        scope.boardListsCache = data;
      };
      ListService.all(scope.board.id)
        .then(scope.storeBoardLists);
      scope.removeBoard = function() {
        BoardService.destroy(scope.board);
      };
    }
  };

}]);

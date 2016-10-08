app.directive('boardPanel',
['BoardService', function(BoardService) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/board_panel.html',
    scope: {
      board: '='
    },
    link: function(scope) {
      scope.removeBoard = function() {
        BoardService.destroy(scope.board);
      };
    }
  };

}]);

app.directive('boardPanel', ['BoardService', function(BoardService) {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/board_panel.html',
    scope: {
      board: '='
    },
    link: function(scope) {
      scope.notifyCtrlRemove = function(response) {
        scope.$emit('board.destroy', response);
      };
      scope.removeBoard = function() {
        scope.board.remove()
          .then(BoardService.destroy(scope.board))
          .catch(function(reason) {
            console.log(reason);
          });
      };
    }
  };

}]);

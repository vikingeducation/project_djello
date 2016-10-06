app.directive('boardPanel', ['BoardService', function(BoardService) {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/board_panel.html',
    scope: {
      board: '='
    }
  };

}]);

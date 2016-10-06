app.directive('showBoardPanel',
['BoardService', function(BoardService) {
  return {
    templateUrl: 'templates/directives/show_board_panel.html',
    restrict: 'E',
    scope: {
      currentBoard: '='
    }
  };

}]);

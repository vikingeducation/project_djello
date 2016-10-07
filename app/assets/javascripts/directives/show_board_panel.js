app.directive('showBoardPanel',
['BoardService', 'ListService',
function(BoardService, ListService) {
  return {
    templateUrl: 'templates/directives/show_board_panel.html',
    restrict: 'E',
    scope: {
      listsInfo: '=',
      currentBoard: '='
    }
  };

}]);

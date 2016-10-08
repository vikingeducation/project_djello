app.directive('showBoardPanel',
function() {
  return {
    templateUrl: 'templates/directives/show_board_panel.html',
    restrict: 'E',
    scope: {
      listsCache: '=',
      currentBoard: '=',
      boardsCache: '=',
      usersCache: '='
    }
  };
});

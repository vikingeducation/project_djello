app.directive('boardListPanel', function () {

  return {
    templateUrl: 'templates/directives/board_list_panel.html',
    scope: {
      boardList: '='
    }
  };

});

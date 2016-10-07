app.directive('indexListPanel', ['ListService', function (ListService) {

  return {
    templateUrl: 'templates/directives/index_list_panel.html',
    restrict: 'E',
    link: function(scope) {
      scope.editListForm = {
        id: scope.list.id,
        title: scope.list.title,
        board_id: scope.currentBoard.id
      };
    }
  };

}]);

app.directive('createListPanel',
['ListService', function(ListService) {

  return {
    templateUrl: 'templates/directives/create_list_panel.html',
    restrict: 'E',
    link: function(scope) {
      scope.createList = function () {
        ListService.create({
          board_id: scope.currentBoard.id,
          title: scope.listForm.title
        });
      };
    }
  };

}]);

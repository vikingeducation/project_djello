app.directive('createListPanel',
['ListService', function(ListService) {

  return {
    templateUrl: 'templates/directives/create_list_panel.html',
    restrict: 'E',
    scope: {
      currentBoard: '='
    },
    link: function(scope) {
      scope.listForm = {
        title: '',
        board_id: scope.currentBoard.id
      };
      scope.createList = function () {
        ListService.create(scope.listForm);
      };
    }
  };

}]);

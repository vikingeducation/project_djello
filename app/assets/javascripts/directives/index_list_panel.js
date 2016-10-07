app.directive('indexListPanel', ['ListService', function (ListService) {

  return {
    templateUrl: 'templates/directives/index_list_panel.html',
    restrict: 'E',
    link: function(scope) {
      scope.submitEditForm = function () {
        ListService.update({
          id: scope.list.id,
          title: scope.list.title,
          description: scope.list.description
        });
      };
      scope.removeList = function() {
        scope.list.remove()
          .then(ListService.destroy(
            scope.list,
            scope.currentBoard.id)
          )
          .catch(function(reason) {
            console.log(reason);
          });
      };
    }
  };

}]);

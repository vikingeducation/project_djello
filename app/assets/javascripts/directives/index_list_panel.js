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
    }
  };

}]);

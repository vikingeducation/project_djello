app.directive('indexListPanel', ['ListService', function (ListService) {

  return {
    templateUrl: 'templates/directives/index_list_panel.html',
    restrict: 'E',
    link: function(scope) {
      scope.testingUpdate = function (list) {
        ListService.update({
          title: 'testing',
          board_id: 121
        });
      };
    }
  };

}]);

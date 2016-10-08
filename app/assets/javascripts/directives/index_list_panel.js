app.directive('indexListPanel',
['ListService', 'CardService',
function (ListService, CardService) {

  return {
    templateUrl: 'templates/directives/index_list_panel.html',
    restrict: 'E',
    scope: {
      list: '=',
      currentBoard: '='
    },
    link: function(scope) {
      CardService.all(scope.list.id)
        .then(function(data) {
          scope.cardsInfo = data;
        });

      scope.submitEditForm = function () {
        ListService.update({
          id: scope.list.id,
          title: scope.list.title,
          description: scope.list.description
        });
      };

      scope.removeList = function() {
        ListService.destroy(scope.list,scope.currentBoard.id);
      };
    }
  };

}]);

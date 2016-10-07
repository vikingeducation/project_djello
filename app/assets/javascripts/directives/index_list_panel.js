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
      CardService.all(scope.list.id).then(function(data) {
        scope.cardsInfo = data;
      });
    }
  };

}]);

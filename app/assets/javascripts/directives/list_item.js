djello.directive('listItem', ['listService', 'cardService', function(listService, cardService) {
  return {
    templateUrl: '/templates/lists/list_item.html',
    restrict: 'E',
    scope: {
      list: '=',
      changeUpdateStatus: "&"
    },
    link: function(scope) {
      scope.cards = cardService.getAll(scope.list.id).$object;

      scope.changeUpdateStatus = function() {
        scope.updating = !scope.updating;
      };

      scope.updateList = function() {
        listService.updateList(scope.list);
        scope.changeUpdateStatus();
      };

      scope.showCardForm = function() {
        scope.addingCard = !scope.addingCard;
        console.log(scope.addingCard)
      }

      scope.deleteList = function(id) {
        listService.delete(id);
      }

      scope.$on(scope.list.id + ".newCard", 
        function(event, response) {
          scope.cards.push(response);
      })
    }
  }
}])
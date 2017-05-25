djello.directive('listItem', 
  ['listService', 'cardService', '$rootScope', 
  function(listService, cardService, $rootScope) {
  return {
    templateUrl: '/templates/lists/list_item.html',
    restrict: 'A',
    scope: {
      list: '=',
      board: '=',
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
      }

      scope.deleteList = function(id) {
        listService.delete(id);
      }

      scope.transfer = function(card) {
        cardService.updateList(card, scope.list.id)
                   .then( function(response) {
                    $rootScope.$broadcast('cards.update')
                   })
      }

      scope.$on(scope.list.id + ".newCard", 
        function(event, response) {
          scope.cards.push(response);
          scope.showCardForm();
      })

      scope.$on('cards.update',
        function() {
          scope.cards = cardService.getAll(scope.list.id).$object;
        })
    }
  }
}])
djello.directive('cardItem', ['listService', 'cardService', function(listService, cardService) {
  return {
    templateUrl: '/templates/cards/card_item.html',
    restrict: 'A',
    scope: {
      card: '='
    },
  }
}])
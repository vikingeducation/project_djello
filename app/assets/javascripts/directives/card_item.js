djello.directive('cardItem', 
  ['listService', 'cardService', 'ModalService', 
  function(listService, cardService, ModalService) {
  return {
    templateUrl: '/templates/cards/card_item.html',
    restrict: 'A',
    scope: {
      card: '=',
      board: '='
    },
    link: function(scope) {
      scope.showCard = function() {
        ModalService.showModal({
          templateUrl: "/templates/cards/show_card.html",
          controller: "showCardsController",
          inputs: {
            card: scope.card,
            board: scope.board
          }
        }).then( function(modal) {
          modal.element.modal();
        })
      }
    }
  }
}])
djello.directive('card',
  ['ModalService',
  function(ModalService) {

  var cardCtrl = function($scope) {

    $scope.openModal = function(card) {
      ModalService.showModal({
        templateUrl: "templates/cards/cardModal.html",
        controller: "ModalController",
        inputs: {
          card: card
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
        });
      });
    };

  }

  return {
    templateUrl: '/templates/cards/directives/card.html',
    restrict: 'E',
    controller: cardCtrl,
    scope: {
      card: '='
    }
  };

}]);
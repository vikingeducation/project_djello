app.controller("CardsCtrl", ['$scope', '$state', 'cardService', 'ModalService', 'Restangular', function($scope, $state, cardService, ModalService, Restangular){

  
  $scope.cards = $scope.list.cards;
  $scope.cardForm = {};
  $scope.cardForm.list_id = $scope.list.id;

  $scope.creatingCard = false;

  $scope.createCard = function(){
    cardService.createCard($scope.cardForm).then(function(response){
      $scope.cards.push(response);

      $scope.creatingCard = false;
      $scope.cardForm = {};
    }, function(){
      console.log("could not create card");

      $scope.creatingCard = false;
      $scope.cardForm = {};
    })
  };

  $scope.showCard = function(card) {
    Restangular.restangularizeElement(null, card, 'cards');
    // Just provide a template url, a controller and call 'showModal'.
    ModalService.showModal({
      templateUrl: "/templates/cards/card.html",
      controller: "CardCtrl",
      inputs: {
        card: card
      }
    }).then(function(modal) {
      // The modal object has the element built, if this is a bootstrap modal
      // you can call 'modal' to show it, if it's a custom modal just show or hide
      // it as you need to.
      

      //not showing the modal
      // $(modal.element).show();
      foofy = modal.element;
      // modal.element.modal();
      $(".modal").modal();
      modal.close.then(function(result) {
        console.log("modal closed");
      });
    });

  };

}]);
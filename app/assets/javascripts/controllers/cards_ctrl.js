app.controller("CardsCtrl", ['$scope', '$state', 'cardService', 'ModalService', 'Restangular', function($scope, $state, cardService, ModalService, Restangular){

  
  $scope.cards = $scope.list.cards;
  //put list info into the cards array since the drag/drop plugin has scope issues
  var listInfo = { list_id: $scope.list.id, id: "listInfo"};
  $scope.cards.unshift(listInfo);


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
      $scope.cardForm.list_id = $scope.list.id;
    })
  };

  $scope.showCard = function(card) {
    Restangular.restangularizeElement(null, card, 'cards');
    
    ModalService.showModal({
      templateUrl: "/templates/cards/card.html",
      controller: "CardCtrl",
      inputs: {
        card: card
      }
    }).then(function(modal) {
    
      modal.element.modal();
      modal.close.then(function(result) {
        console.log("modal closed");
      });
    });

  };




}]);
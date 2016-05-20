djello.controller('ModalCtrl', ['$scope', 'ModalService', 'CardsService', 'ListsService', function($scope, ModalService, CardsService, ListsService) {


  $scope.allLists = ListsService.currentLists;
  $scope.cardData = {};
  $scope.isCardFormOpen = false;


  $scope.show = function(event) {
    $scope.setCurrentVars(event);

    ModalService.showModal({
      templateUrl: 'templates/card_modal.html',
      scope: $scope, // This was the key!!!!
      controller: "ModalController"
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        console.log(result)
      })
    })
  };


  $scope.setCurrentVars = function(event) {
    var listId = Number($(event.target).attr("list-id"));
    var cardId = Number($(event.target).attr("card-id"))

    $scope.currentList = CardsService.getCurrentList($scope.allLists, listId);
    $scope.currentCard = CardsService.getCurrentCard($scope.currentList.cards, cardId)
  };


  $scope.createCard = function(formIsValid) {
    if (formIsValid) {
      $scope.cardData["list_id"] = $scope.currentList.id;
      $scope.cardData["completed"] = false;
      CardsService.createCard($scope.cardData).then(
        function(newCard) {
          console.log("$scope.currentList.cards: ")
          console.log($scope.currentList.cards)
          $scope.currentList.cards.push(newCard);
          $scope.cardData = {};
          $scope.isCardFormOpen = false;
        })
    }
  };


  $scope.updateCard = function($data, card, type) {
    if (type === "title") {
      card.title = $data;
    } else if (type === "description") {
      card.description = $data;
    }
    CardsService.updateCard(card).then(
      function(updatedCard) {
        for (var i = 0; i < $scope.currentList.length; i++) {
          if (updatedCard.id == $scope.currentList[i].id) {
            $scope.currentList.splice(i, 1, updatedCard)
          }
        }        
      })
  }


  $scope.deleteCard = function(card) {
    CardsService.deleteCard(card).then(
      function(deletedCard) {
        for (var i = 0; i < $scope.currentList.cards.length; i++) {
          if (deletedCard.id == $scope.currentList.cards[i].id) {
            $scope.currentList.cards.splice(i, 1);
          }
        }
      })
  }



}])



djello.controller('ModalController', ['$scope', 'close', function($scope, close) {

  $scope.dismissModal = function(result) {
    close(result, 500);
  }


}])
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

    console.log($scope.currentList)
    console.log($scope.currentCard)
  };


  $scope.createCard = function(formIsValid) {
    if (formIsValid) {
      $scope.cardData["list_id"] = $scope.currentList.id;
      $scope.cardData["completed"] = false;
      CardsService.createCard($scope.cardData).then(
        function(newCard) {
          $scope.currentList.cards.push(newCard);
          $scope.cardData = {};
          $scope.isCardFormOpen = false;
        })
    }
  }



}])



djello.controller('ModalController', ['$scope', 'close', function($scope, close) {

  $scope.close = function(result) {
    close(result, 500);
  }
}])
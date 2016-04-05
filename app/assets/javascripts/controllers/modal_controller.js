djello.controller('ModalCtrl', ['$scope', 'ModalService', 'CardsService', 'ListsService', function($scope, ModalService, CardsService, ListsService) {


  $scope.allLists = ListsService.currentLists;
  // $scope.currentList = {};
  // $scope.currentCard = {};
  // $scope.title = "HI"


  $scope.show = function(event) {

    var listId = Number($(event.target).attr("list-id"));
    var cardId = Number($(event.target).attr("card-id"))
    // console.log("got into show?")
    // console.log($(event.target).attr("list-id"))
    // console.log(typeof $(event.target).attr("list-id"))
    // console.log($(event.target).attr("card-id"))
    // console.log($scope.allLists)
    // console.log(_.filter($scope.allLists, {id: "215"}))
    console.log(listId)
    console.log(cardId)

    $scope.currentList = CardsService.getCurrentList($scope.allLists, listId);
    // $scope.allCards = $scope.currentList.cards;
    $scope.currentCard = CardsService.getCurrentCard($scope.currentList.cards, cardId)

    console.log($scope.currentCard)

    ModalService.showModal({
      templateUrl: 'templates/card_modal.html',
      scope: $scope, // This was the key!!!!
      controller: "ModalController" //,
      // resolve: {
      //   list: function() {
      //     return scope.currentList;
      //   },
      //   card: function() {
      //     return scope.currentCard;
      //   }
      // }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        console.log(result)
      })
    })
  };



}])



djello.controller('ModalController', ['$scope', 'close', function($scope, close) {

  $scope.close = function(result) {
    close(result, 500);
  }
}])
app.controller("CardsCtrl", ["$scope", "close", "card", 'Restangular', 'boardIndex', 'BoardService', 'cardIndex',
                            function($scope, close, card, Restangular, boardIndex, BoardService, cardIndex){

  $scope.card = card;
  console.log(boardIndex)

  $scope.deleteCard = function() {

    Restangular.one("cards", $scope.card.id).get().then(function(jsonCard) {
      jsonCard.remove();
      $scope.card.completed = true;

      for (var i = 0; i < BoardService.boards.list[boardIndex].lists.length; i++) {
        console.log("comparing " + BoardService.boards.list[boardIndex].lists[i].id + " with " + card.list.id)
        if (BoardService.boards.list[boardIndex].lists[i].id === card.list.id) {
          return BoardService.boards.list[boardIndex].lists[i].cards.splice(cardIndex, 1);
        }
      };

    })

  }

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
 };

}])
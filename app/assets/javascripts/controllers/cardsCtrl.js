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

  $scope.editForm = { hidden: false }

  $scope.editField = function(item) {
    console.log(item)
    $scope.editForm.hidden = true;
    $scope.editForm.fieldToEdit = item;
  }

  $scope.hideForm = function() {
    $scope.editForm.hidden = false;
    $scope.editForm.fieldToEdit = undefined;
  }

  $scope.beingEdited = function (item) {
    return ($scope.editForm.hidden &&
            $scope.editForm.fieldToEdit === item)
  }

  $scope.updateCard = function(card) {

    $scope.hideForm();

    Restangular.one("cards", card.id).get().then(function(jsoncard) {
      jsoncard.title = card.title
      jsoncard.description = card.description
      jsoncard.put();

    })

  }

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
 };

}])
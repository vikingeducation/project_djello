app.controller("CardsCtrl", ["$scope", "close", "card", 'Restangular', 'boardIndex', 'BoardService', 'cardIndex', 'UserService',
                            function($scope, close, card, Restangular, boardIndex, BoardService, cardIndex, UserService){

  $scope.card = card;
  $scope.card.members = $scope.card.members || [];
  $scope.card.cmems = $scope.card.cmems || [];
  $scope.users = UserService.users;

  console.log(card.cmems)
  // Restangular.all("card_members").getList().then(function(cmembers) {
  //   console.log(cmembers)
  //   $scope.cmembers = cmembers
  // })

  $scope.deleteCard = function() {

    Restangular.one("cards", $scope.card.id).get().then(function(jsonCard) {
      jsonCard.remove();
      $scope.card.completed = true;

      for (var i = 0; i < BoardService.boards.list[boardIndex].lists.length; i++) {
        if (BoardService.boards.list[boardIndex].lists[i].id === card.list.id) {
          return BoardService.boards.list[boardIndex].lists[i].cards.splice(cardIndex, 1);
        }
      };

    })

  }

  $scope.editForm = { hidden: false }

  $scope.editField = function(item) {
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

  $scope.addMember = function() {

    var newCardMember = {}
    newCardMember.user_id = $scope.newmember.id
    newCardMember.card_id = $scope.card.id

    console.log(newCardMember)
    $scope.card.members.push($scope.newmember)

    Restangular.all("card_members").post( { card_member : newCardMember} )
      .then(function(response){
        console.log(response)
        $scope.card.cmems.push(response)
      });

    $scope.newmember = undefined

  }

  $scope.removeUser = function (member) {

    for (var i = 0; i < $scope.card.cmems.length; i++) {
      if ($scope.card.cmems[i].user_id = member.id) {
        $scope.card.cmems[i].remove();
        $scope.card.cmems.splice(i, 1);
      }
    };

  }

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
 };

}])
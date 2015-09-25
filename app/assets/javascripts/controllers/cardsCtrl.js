app.controller("CardsCtrl", ["$scope", "close", "card", "Restangular", "BoardService", "$location", "UserService",
 function($scope, close, card, Restangular, BoardService, $location, UserService){

  $scope.card = card;

  $scope.editField = false;

  $scope.boards = BoardService.boards;

  $scope.users = BoardService.users;

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
   };

  $scope.toggleEdit = function() {
    $scope.editField = true;
  }

  $scope.editCard = function(card) {
    Restangular.one("cards", card.id).get().then(function(jsonCard) {
        jsonCard.title = card.title
        jsonCard.description = card.description
        jsonCard.put();
        $scope.editField = false;
        console.log("success?")

      })

    Restangular.all('activities').post( { user_id : UserService.currentUser.user.id,
                                          card_id : card.id,
                                          desc : "Edited by " + UserService.currentUser.user.username } )
      .then(function(response){
        console.log(UserService.currentUser.user.username)
        for (var i = 0; i < $scope.boards.list.length; i++) {
          if ($scope.boards.list[i].id == BoardService.boards.selectedBoard) {
            for (var j = 0; j < $scope.boards.list[i].lists.length; j++) {
              if ($scope.boards.list[i].lists[j].id === card.list.id) {
                for (var k = 0; k < $scope.boards.list[i].lists[j].cards.length; k++) {
                  if ($scope.boards.list[i].lists[j].cards[k] === card) {
                    BoardService.boards.list[i].lists[j].cards[k].activities.push(response)
                    $location.path("/boards")
                  }
                }
              }
            }
          }
        }
      });

  }

  $scope.addUser = function(card_member, card, list) {
    card_member.card_id = card.id;
    Restangular.all('card_members').post( { card_member : card_member } )
      .then(function(response){
        console.log($scope.boards.selectedBoard)
        for (var i = 0; i < $scope.boards.list.length; i++) {
          console.log($scope.boards.list[i].id)
          console.log(BoardService.boards.selectedBoard)
          if ($scope.boards.list[i].id == BoardService.boards.selectedBoard) {
            console.log("found board")
            for (var j = 0; j < $scope.boards.list[i].lists.length; j++) {
              if ($scope.boards.list[i].lists[j].id === card.list.id) {
                console.log("found list")
                for (var k = 0; k < $scope.boards.list[i].lists[j].cards.length; k++) {
                  if ($scope.boards.list[i].lists[j].cards[k] === card) {
                    console.log($scope.boards.list[i].lists[j].cards[k].users)
                    if (BoardService.boards.list[i].lists[j].cards[k].users == undefined) {
                      BoardService.boards.list[i].lists[j].cards[k].users = { response.user }
                      BoardService.boards.list[i].lists[j].cards[k].card_members.push(response)
                      $location.path("/boards")
                    } else {
                      BoardService.boards.list[i].lists[j].cards[k].users.push(response.user)
                      BoardService.boards.list[i].lists[j].cards[k].card_members.push(response)
                      $location.path("/boards")

                    }
                  }
                }
              }
            }
          }
        }
      });
  }

  $scope.removeUser = function(user, card) {
    console.log(card.card_members)
    var cm_id = 0;
    for (var i = 0; i < card.card_members.length; i++){
      if (card.card_members[i].user_id == user.id){
        cm_id = card.card_members[i].id
      }
    }
    if (!$scope.boards.selectedBoard) return;
    var id = user.id
    Restangular.one("card_members", cm_id).get().then(function(card_member) {
      card_member.remove();
      for (var i = 0; i < $scope.boards.list.length; i++) {
          if ($scope.boards.list[i].id == BoardService.boards.selectedBoard) {
            for (var j = 0; j < $scope.boards.list[i].lists.length; j++) {
              if ($scope.boards.list[i].lists[j].id === card.list.id) {
                for (var k = 0; k < $scope.boards.list[i].lists[j].cards.length; k++) {
                  if ($scope.boards.list[i].lists[j].cards[k] === card) {
                    for (var y = 0; y < $scope.boards.list[i].lists[j].cards[k].users.length; y++){
                      if ($scope.boards.list[i].lists[j].cards[k].users[y].id == user.id) {
                        return $scope.boards.list[i].lists[j].cards[k].users.splice(y, 1);

                      }
                    }
                    // console.log($scope.boards.list[i].lists[j].cards[k].users)
                    // BoardService.boards.list[i].lists[j].cards[k].users.push(response.user)
                    // $location.path("/boards")
                  }
                }
              }
            }
          }
        }
    })
  }

}])
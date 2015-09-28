app.controller("BoardsCtrl",
              ["$scope", "Restangular", "UserService", 'userPromise', '$location', "BoardService", "ModalService",
              function($scope, Restangular, UserService, userPromise, $location, BoardService, ModalService){
  if (!userPromise) {
    $location.path('/')
  };

  $scope.boards = BoardService.boards;
  // $scope.boards.selectedBoard = BoardService.boards.selectedBoard

  $scope.editForm = { hidden: false }

  $scope.editField = function(item, idx) {
    console.log(item + " | " + idx)
    $scope.editForm.hidden = true;
    $scope.editForm.fieldToEdit = item;
    $scope.editForm.listIndex = idx;
  }

  $scope.hideForm = function() {
    $scope.editForm.hidden = false;
    $scope.editForm.fieldToEdit = undefined;
    $scope.editForm.listIndex = undefined;
  }

  $scope.beingEdited = function (item, idx) {
    return ($scope.editForm.hidden &&
            $scope.editForm.fieldToEdit === item &&
            $scope.editForm.listIndex === idx)
  }

  $scope.updateList = function(list) {

    $scope.hideForm();

    Restangular.one("lists", list.id).get().then(function(jsonList) {
      jsonList.title = list.title
      jsonList.description = list.description
      jsonList.put();

    })

  }

  $scope.deleteBoard = function() {
    if (!$scope.boards.selectedBoard) return;
    var id = $scope.boards.selectedBoard
    Restangular.one("boards", id).get().then(function(board) {
      board.remove();
      for (var i = 0; i < $scope.boards.list.length; i++) {
        if ($scope.boards.list[i].id === board.id) {

          return $scope.boards.list.splice(i, 1);
        }
      };
    })
  }

  $scope.createList = function(list) {

    if (!$scope.boards.selectedBoard || !list) return;

    console.log($scope.boards.selectedBoard)

    list.board_id = $scope.boards.selectedBoard;

    Restangular.all('lists').post( { list : list} )
      .then(function(response){
        for (var i = 0; i < $scope.boards.list.length; i++) {
          if ($scope.boards.list[i].id === $scope.boards.selectedBoard) {
            console.log("found board")
            BoardService.boards.list[i].lists.push(response)
            $location.path("/boards")
          }
        };
      });

  }

  $scope.showCard = function(card, boardIndex, cardIndex) {

    ModalService.showModal({
      templateUrl: "templates/cards/cardmodal.html",
      controller: "CardsCtrl",
      inputs: {
        card: card,
        boardIndex: boardIndex,
        cardIndex: cardIndex,
      }
    }).then(function(modal) {
      console.log(card)
      modal.element.modal();
      modal.close.then(function(result) {
      });
    });

  };
}])
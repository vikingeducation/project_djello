app.controller("BoardsCtrl",
              ["$scope", "Restangular", "UserService", 'userPromise', '$location', "BoardService", "ModalService",
              function($scope, Restangular, UserService, userPromise, $location, BoardService, ModalService){
  if (!userPromise) {
    $location.path('/')
  };

  $scope.boards = BoardService.boards;
  $scope.users = BoardService.users;
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

    Restangular.all('lists').post( { list : list } )
      .then(function(response){
        for (var i = 0; i < $scope.boards.list.length; i++) {
          if ($scope.boards.list[i].id === $scope.boards.selectedBoard) {

            console.log($scope.boards.list[i].lists)
            BoardService.boards.list[i].lists.push(response)
            $location.path("/boards")
          }
        };
      });

  }

  $scope.createCard = function(card, list) {

    if (!list || !card) return;

    card.list_id = list.id;

    Restangular.all('cards').post( { card : card } )
      .then(function(response){
        console.log("success")
        for (var i = 0; i < $scope.boards.list.length; i++) {
          if ($scope.boards.list[i].id == $scope.boards.selectedBoard) {
            console.log("found board")
            for (var j = 0; j < $scope.boards.list[i].lists.length; j++) {
              if ($scope.boards.list[i].lists[j] === list) {
                console.log("found list")
                BoardService.boards.list[i].lists[j].cards.push(response)
                $location.path("/boards")
              }
            }
          }
        };
      });

  }

  $scope.showCard = function(card) {

    ModalService.showModal({
      templateUrl: "templates/cards/cardmodal.html",
      controller: "CardsCtrl",
      inputs: {
        card: card
      }
    }).then(function(modal) {
      console.log(card)
      modal.element.modal();
      modal.close.then(function(result) {
      });
    });

  };
}])
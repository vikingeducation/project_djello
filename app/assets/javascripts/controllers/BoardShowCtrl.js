app.controller("BoardShowCtrl", ["$stateParams", "$state", "$scope", "_", "boardsService", "boards", "listsService", "ModalService",
 function($stateParams, $state, $scope, _, boardsService, boards, listsService, ModalService) {

  $scope.message = "Board Show"


  $scope.editingTitle = {}
  $scope.editingDescription = {}
  $scope.listTitle = {}
  $scope.listDescription = {}
  
  var _setList = function() {
    for (var i = 0; i < $scope.lists.length; i++) {
      var thisList = $scope.lists[i]
      $scope.listTitle[thisList.id] = thisList.title
      $scope.listDescription[thisList.id] = thisList.description
    }
  }

  $scope.boards = boards
  $scope.showNewList = false; 
  $scope.board = boardsService.find($stateParams.id)

  $scope.selectedBoard = $scope.selectedBoard || $scope.board
  console.log($scope.board)

  listsService.all($scope.board).then(function(response) {
    $scope.lists = response
    _setList();
  })


  $scope.deleteBoard = function() {
    $scope.board.remove();
    $state.go("boardsIndex")
  }
  $scope.switchBoards = function() {
    console.log("going to board " + $scope.selectedBoard.title)
    return $state.go("boardShow", {id: $scope.selectedBoard.id})
  }

  $scope.newList = function() {
    $scope.showNewList = true
    $scope.newList = {}
  }  

  $scope.editTitle = function(list) {
    console.log("editing title")
    $scope.editingDescription[list.id] = false
    $scope.editingTitle[list.id] = true
  }

  $scope.editDescription = function(list) {
    console.log("editing description")
    $scope.editingTitle[list.id] = false
    $scope.editingDescription[list.id] = true
  }

  $scope.makeNewList = function() {
    listsService.create($scope.board, $scope.newList)
    $scope.newList = {}
  }

  $scope.cancelEditTitle = function(list) {
    $scope.editingTitle[list.id] = false
    $scope.listTitle[list.id] = list.title
  }

  $scope.cancelEditDescription = function(list) {
    $scope.editingDescription[list.id] = false
    $scope.listDescription[list.id] = list.description
  }

  $scope.submitTitleEdits = function(list) {
    return listsService.editTitle(list, $scope.listTitle[list.id]).then(function(response) {
      $scope.listTitle[response.id] = response.title
      angular.copy(response, list)
      $scope.editingTitle[list.id] = false
    })
  }

  $scope.submitDescriptionEdits = function(list) {
    return listsService.editDescription(list, $scope.listDescription[list.id]).then(function(response) {
      $scope.listDescription[response.id] = response.description
      angular.copy(response, list)
      $scope.editingDescription[list.id] = false
    })
  }

  $scope.deleteList = function(list) {
    list.remove();
    listsService.all($scope.board).then(function(response) {
      $scope.lists = response
      _setList();
    })
  }

  $scope.showNewCardModal = function(list) {
    ModalService.showModal({
      templateUrl: "templates/newCardModal.html",
      controller: ["$scope", "cardService", "listsService", "close", function($scope, cardService, listsService, close) {

        $scope.list = list
        $scope.newCard = {}

        $scope.handleNewCardForm = function() {
          cardService.create(list, $scope.newCard).then(function(response) {
          })
          $scope.close(true, 200);
        }

        $scope.close = function(result) {
          close(result, 200); 
        };
      }]
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(response) {
        if (response) {
          listsService.all($scope.board).then(function(response) {
            $scope.lists = response
            _setList();
          })
        }
        $('.modal-backdrop').remove()
      })
    })
  }

  $scope.showCard = function(card) {
    ModalService.showModal({
      templateUrl: "templates/cardShowModal.html", 
      controller: ["$scope", "cardService", "listsService", "close", function($scope, cardService, listsService, close) {

        $scope.card = card
        $scope.close = function(result) {
          close(result, 200)
        }
      }]
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(response) {
        $('.modal-backdrop').remove()
      })
    })
  }


}])
app.controller("BoardShowCtrl", ["$stateParams", "$state", "$scope", "_", "boardsService", "boards", "listsService", "ModalService", "teamsService",
 function($stateParams, $state, $scope, _, boardsService, boards, listsService, ModalService, teamsService) {

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
  teamsService.getTeamByBoard($scope.board).then(function(response) {
    console.log("response in board show ctrl")
    console.log(response)
    $scope.team = response
  })

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

  $scope.showNewCardModal = function(list, team) {
    ModalService.showModal({
      templateUrl: "templates/newCardModal.html",
      controller: ["$scope", "cardService", "listsService", "close", function($scope, cardService, listsService, close) {

        $scope.list = list
        $scope.newCard = {}
        $scope.newCard.members = []
        $scope.teamMembers = []

        angular.copy(team.users, $scope.teamMembers)

        $scope.handleNewCardForm = function() {
          cardService.create(list, $scope.newCard, $scope.teamMembers).then(function(response) {
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

  $scope.showCard = function(card, list) {
    ModalService.showModal({
      templateUrl: "templates/cardShowModal.html", 
      controller: ["$scope", "cardService", "listsService", "close", function($scope, cardService, listsService, close) {

        $scope.list = list
        $scope.editingText = false
        $scope.editingTitle = false
        $scope.card = card
        $scope.cardTitle = card.title
        $scope.cardText = card.text

        $scope.editText = function() {
          $scope.editingText = true
        }
        $scope.editTitle = function() {
          $scope.editingTitle = true
        }

        $scope.submitTextEdits = function() {
          cardService.editText(card, $scope.cardText, list).then(function(response) {
            console.log(response)
            $scope.cardText = response.text
            // $scope.card.text = response.text
            angular.copy(response, $scope.card)
            $scope.editingText = false
          })
        }
        $scope.submitTitleEdits = function() {
          cardService.editTitle(card, $scope.cardTitle, list).then(function(response) {
            console.log(response)
            $scope.cardTitle = response.title
            // $scope.card.title = response.title
            angular.copy(response, $scope.card)
            $scope.editingTitle = false
          })
        }

        $scope.cancelEditText = function() {
          $scope.editingText = false
          $scope.cardText = card.text
        }
        $scope.cancelEditTitle = function() {
          $scope.editingTitle = false
          $scope.cardTitle = card.title
        }

        $scope.close = function(result) {
          close(result, 200)
        }

        $scope.completeCard = function() {
          cardService.completeCard(card, list).then(function(response) {
            console.log(response)
            angular.copy(response, $scope.card)
          })
        }
        $scope.uncompleteCard = function() {
          cardService.uncompleteCard(card, list).then(function(response) {
            console.log(response)
            angular.copy(response, $scope.card)
          })
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
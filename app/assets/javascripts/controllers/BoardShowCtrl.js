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
      controller: "NewCardCtrl", 
      inputs: {
        list: list,
        team: team
      }
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

  $scope.showCard = function(card, list, team) {
    ModalService.showModal({
      templateUrl: "templates/cardShowModal.html", 
      controller: "CardShowCtrl", 
      inputs: {
        card: card,
        list: list,
        team: team
      } 
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(response) {
        $('.modal-backdrop').remove()
      })
    })
  }

}])
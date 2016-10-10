djello.controller('BoardsShowCtrl', ['$scope', '$timeout', 'board', 'BoardService', '$stateParams', 'boards', '$state', 'ModalService', 'Restangular', 'MemberService', 'memberships', 'currentUser', 'CardService',
  function($scope, $timeout, board, BoardService, $stateParams, boards, $state, ModalService, Restangular, MemberService, memberships, currentUser, CardService){

  $scope.board = board;
  $scope.boards = boards;
  $scope.titleEditing = false;
  $scope.memberships = memberships;
  $scope.currentUser = currentUser;
  $scope.newList = {};
  console.log($scope.currentUser)
  // Board functionality

  $scope.toggleTitleEditing = function() {
    $scope.titleEditing = !$scope.titleEditing;
  };

  $scope.changeList =function(event, ui, list){
    list.cards.push($scope.draggedCard);
    var index = _.indexOf($scope.oldList, $scope.draggedCard)
    $scope.oldList.cards.splice(index, 1);
    CardService.changeList($scope.draggedCard.id, list.id)
    .then(function(response){
      MemberService.getUser($scope.currentUser.id);
    })
  }

  $scope.setDragParams = function(event, ui, card, list) {
    $scope.draggedCard = card;
    $scope.oldList = list;
    console.log($scope.draggedCard.title)
    console.log($scope.oldList.title)
  }

  $scope.hoverIn = function(item){
    item.hoverEdit = true;
    };

  $scope.hoverOut = function(item){
    item.hoverEdit = false;
  };

  $scope.updateTitle = function(){
    console.log("Hitting controller function")
    $scope.titleEditing = false;
    $scope.board.save().then(function(response){
      MemberService.getUser($scope.currentUser.id);
    });
  };

  $scope.changeBoard = function(){
    $state.go('boards.show', {id: $scope.selectedBoard.id})
  };

  $scope.deleteBoard = function(){
    $scope.board.remove().then(function(response){
      var index = _.indexOf($scope.currentUser.boards, response)
      $scope.currentUser.boards.splice(index, 1);
      $state.go('boards.index');
    })
  };

  $scope.editTitle = function(){
    console.log("Firing edit title");
    $scope.toggleTitleEditing();
    $timeout(function(){
      $('#titleEdit').focus();
    }, 200);
  };


  $scope.createBoard = function(){
    BoardService.createBoard()
    .then(function(response){
      $state.go('boards.show', {id: response.id})
    })
  };

  // list functionality

  $scope.displayListCreate = function(){
    $scope.creatingList = !$scope.creatingList;
  }

  $scope.createList = function(){
    $scope.newList.boardId = $scope.board.id;
    $scope.checkForParams();
    $scope.board.createList($scope.newList);
    $scope.newList = {};
    $scope.creatingList = !$scope.creatingList;
  };

  $scope.checkForParams = function(){
    if ($scope.newList.title === undefined){
      $scope.newList.title = "Click to add title";
    } else if ($scope.newList.description === undefined){
      $scope.newList.description = "Click to add description";
    }
  }

  $scope.deleteList = function(list){
    var index = _.indexOf($scope.board.lists, list)
    $scope.board.lists.splice(index, 1);
    list.remove()
  };


  $scope.editListTitle = function(list) {
    list.titleEditing = true;
    $timeout(function(){
      $('[list-title-id="'+ list.id + '"]').focus();
    }, 200);
  };

  $scope.updateListTitle = function(list) {
    list.titleEditing = false;
    list.patch().then(function(response){
      MemberService.getUser($scope.currentUser.id);
    });
  };

  $scope.editListDesc = function(list) {
    list.descEditing = true;
    $timeout(function(){
      $('[list-desc-id="'+ list.id + '"]').focus();
    }, 200);
  };

  $scope.updateListDesc = function(list) {
    list.descEditing = false;
    list.patch().then(function(response){
      MemberService.getUser($scope.currentUser.id);
    });
  }

  $scope.createCard = function(list) {
    list.createCard($scope.board.id).then(
      function(response){
        console.log("Hello!!!");
        Restangular.restangularizeElement(null, response, 'cards' );
        $scope.show(list, response);
      })
  }

  $scope.rectCard = function(card, list) {
    Restangular.restangularizeElement(null, card, 'cards' );
    $scope.show(list, card)
  }

  // Modal for Card

  $scope.show = function(list, card) {
        ModalService.showModal({
            templateUrl: '/templates/cards/show.html',
            controller: "CardCtrl",
            inputs: {
              card: card,
              list: list,
              memberships: memberships
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                console.log("You said " + result);
            });
        });
    };



  
}])
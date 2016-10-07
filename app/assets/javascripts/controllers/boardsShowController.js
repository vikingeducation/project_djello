djello.controller('BoardsShowCtrl', ['$scope', '$timeout', 'board', 'BoardService', '$stateParams', 'boards', '$state', 'ModalService', 'Restangular', 'MemberService', 'memberships',
  function($scope, $timeout, board, BoardService, $stateParams, boards, $state, ModalService, Restangular, MemberService, memberships){

  $scope.board = board;
  $scope.boards = boards;
  $scope.titleEditing = false;
  $scope.memberships = memberships;
  // Board functionality

  $scope.toggleTitleEditing = function() {
    $scope.titleEditing = !$scope.titleEditing;
  };

  $scope.updateTitle = function(){
    $scope.titleEditing = false;
    $scope.board.save().then(function(response){
      BoardService.getBoards();
    });
  };

  $scope.changeBoard = function(){
    $state.go('boards.show', {id: $scope.selectedBoard.id})
  };

  $scope.deleteBoard = function(){
    $scope.board.remove().then(function(response){
      BoardService.getBoards();
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

  $scope.createList = function(){
    $scope.board.createList();
  };

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
    list.patch();
  };

  $scope.editListDesc = function(list) {
    list.descEditing = true;
    $timeout(function(){
      $('[list-desc-id="'+ list.id + '"]').focus();
    }, 200);
  };

  $scope.updateListDesc = function(list) {
    list.descEditing = false;
    list.patch();
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
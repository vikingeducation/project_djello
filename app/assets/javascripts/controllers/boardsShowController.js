djello.controller('BoardsShowCtrl', ['$scope', '$timeout', 'board', 'BoardService', '$stateParams', 'boards', '$state', 'ModalService',
  function($scope, $timeout, board, BoardService, $stateParams, boards, $state){

  $scope.board = board;
  $scope.boards = boards;
  $scope.titleEditing = false;

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
    console.log("Delete!!!")
    console.log(list);
    list.remove().then(function(response){
      var index = _.indexOf($scope.board.lists, response)
      $scope.board.lists.splice(index, 1);
    })
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
    list.createCard($scope.board.id)
  }

  // Modal for Card

  $scope.show = function() {
        ModalService.showModal({
            templateUrl: '/templates/cards/show.html',
            controller: "BoardsShowCtrl"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };

  
}])
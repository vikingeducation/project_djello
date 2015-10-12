djello.controller('listCtrl', 
  ['$scope', 
   'boardService',
   'listService',
   'sessionService', 
   'userService',
   '$stateParams',
   'ModalService',
  function($scope, 
           boardService, 
           listService, 
           sessionService, 
           userService, 
           $stateParams, 
           ModalService) {
  $scope.boards = boardService.boards;
  $scope.lists = listService.lists;
  $scope.currentUser = sessionService.currentUser;
  $scope.users = userService.users;
  $scope.edit = false;
  $scope.listForm = {};
  $scope.showBoardForm = {};
  $scope.showListForm = {};
  $scope.showEditListForm = { status: [] };

  $scope.board = boardService.currentBoard;

  // Find the current board
  boardService.getBoard($stateParams.id)

  // Populate all the lists of current board
  listService.getLists($stateParams.id);

  // Populate users
  userService.getUsers();

  $scope.updateBoard = function() {
    boardService.updateBoard($scope.board)
    $scope.showBoardForm.status = false;
  }

  $scope.createList = function(){
    listService.createList($scope.listForm, $scope.board);
    $scope.showListForm.status = false;
  }

  $scope.updateList = function(list) {
    listService.updateList(list);
    $scope.showEditListForm.status[list.id] = false;
  }

  $scope.showCreateCardModal = function(list) {
    ModalService.showModal({
      templateUrl: "templates/create_card_modal.html",
      controller: "createCardModalCtrl",
      inputs: {
        board: $scope.board,
        list: list
      }
    }).then(function(modal) {
      //it's a bootstrap element, use 'modal' to show it
      modal.element.modal();
      modal.close.then(function(result) {
        console.log(result);
      });
    });
  }

  $scope.showCardModal = function(card, list) {
    ModalService.showModal({
      templateUrl: "templates/card_modal.html",
      backdrop: false,
      controller: "cardModalCtrl",
      inputs: {
        card: card,
        board: $scope.board,
        list: list, 
        users: $scope.users
      }
    }).then(function(modal) {
      //it's a bootstrap element, use 'modal' to show it
      modal.element.modal();
      console.log('modal', modal);
      // modal.close.then(function(result) {
      //   console.log(result);
      // });
    });
  }





  // $scope.setEdit = function(card){
  //   $scope.editCard = card
  //   $scope.edit = true
  // }

  // $scope.cancelEdit = function(){
  //   $scope.edit = false
  // }


  // $scope.submitEdit = function(editCard, card){
  //   board.one('cards', card.id).get().then(function(card){
  //     if (card.name != editCard.name) {
  //       var nameMsg = currentUser.email + " changes the title to " + editCard.name;
  //     };
  //     if (card.content != editCard.content) {
  //       var contentMsg = currentUser.email + " changes the content to " + editCard.content;
  //     };
  //     card.name = editCard.name;
  //     card.content = editCard.content;
  //     card.put().then(function(){
  //       if (nameMsg) {
  //         addActivity(card, nameMsg);
  //       } else if (contentMsg) {
  //         addActivity(card, contentMsg);
  //       }
  //     });
  //   });

  //   $scope.edit = false
  // }

  // $scope.completeCard = function(card, list) {
  //   $scope.board.data.one('cards', card.id).remove().then(function(deletedCard){
  //     list.cards.splice(list.cards.indexOf(card), 1);
  //   })
  // }

  // $scope.setList = function(list) {
  //   $scope.curList = list;
  // }

  // $scope.setCard = function(card) {
  //   $scope.modalCard = card;
  // }

  // $scope.addMember = function(card_id, member_id) {
  //   Restangular.all("user_boards").post({
  //     card_id: card_id,
  //     user_id: member_id
  //   })
  //   .then(function(newMember) {
  //     $scope.board.members.push(newMember);
  //   })
  // }

  // $scope.removeMember = function(card_id, member) {
  //   console.log("member:", member)
  //   console.log("id:", member.id)
  //   Restangular.all("user_boards").remove({
  //     card_id: card_id,
  //     user_id: member.id
  //   })
  //   .then(function() {
  //     var index = $scope.board.members.indexOf(member);
  //     $scope.board.members.splice(index, 1);
  //   })
  // }

  function addActivity(card, content) {
    board.all("activities").post({
      activity: {      
        card_id: card.id,
        content: content
      }
    })
    .then(function(newActivity){
      card.activities.push(newActivity);
    })
  }

}])









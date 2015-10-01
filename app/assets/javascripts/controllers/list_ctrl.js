djello.controller('listCtrl', 
  ['$scope', 
   'boardService',
   'listService',
   'sessionService', 
   'userService',
   '$stateParams',
 function($scope, boardService, listService, sessionService, userService, $stateParams) {
  $scope.boards = boardService.boards;
  $scope.lists = listService.lists;
  $scope.currentUser = sessionService.currentUser;
  $scope.users = userService.users;
  $scope.edit = false;
  $scope.listForm = {};
  $scope.showEditListForm = {};

  $scope.board = boardService.currentBoard;

  // Find the current board
  boardService.getBoard($stateParams.id)

  // Populate all the lists of current board
  listService.getLists($stateParams.id);

  $scope.updateBoard = function() {
    boardService.updateBoard($scope.board)
    $scope.showBoardForm = false;
  }

  $scope.createList = function(){
    listService.createList($scope.listForm, $scope.board);
    $scope.showListForm = false;
  }

  $scope.updateList = function(list) {
    // list.put();
    listService.updateList(list);
    $scope.showEditListForm[list.id] = false;
  }

  $scope.setEdit = function(card){
    $scope.editCard = card
    $scope.edit = true
  }

  $scope.cancelEdit = function(){
    $scope.edit = false
  }


  $scope.submitEdit = function(editCard, card){
    board.one('cards', card.id).get().then(function(card){
      if (card.name != editCard.name) {
        var nameMsg = currentUser.email + " changes the title to " + editCard.name;
      };
      if (card.content != editCard.content) {
        var contentMsg = currentUser.email + " changes the content to " + editCard.content;
      };
      card.name = editCard.name;
      card.content = editCard.content;
      card.put().then(function(){
        if (nameMsg) {
          addActivity(card, nameMsg);
        } else if (contentMsg) {
          addActivity(card, contentMsg);
        }
      });
    });

    $scope.edit = false
  }

  $scope.createCard = function(cardForm, list){

    $scope.board.data.all('cards').post({
      card: {
        name: cardForm.name,
        content: cardForm.content,
        list_id: list.id
      }
    })
    .then(function(newCard){
      list.cards = list.cards || [];
      list.cards.push(newCard);
      $scope.card = {};
      var content = currentUser.email + " added this card to the " + list.name;
      addActivity(newCard, content);
    })
  }

  $scope.completeCard = function(card, list) {
    $scope.board.data.one('cards', card.id).remove().then(function(deletedCard){
      list.cards.splice(list.cards.indexOf(card), 1);
    })
  }

  $scope.setList = function(list) {
    $scope.curList = list;
  }

  $scope.setCard = function(card) {
    $scope.modalCard = card;
  }

  $scope.addMember = function(card_id, member_id) {
    Restangular.all("user_boards").post({
      card_id: card_id,
      user_id: member_id
    })
    .then(function(newMember) {
      $scope.board.members.push(newMember);
    })
  }

  $scope.removeMember = function(card_id, member) {
    console.log("member:", member)
    console.log("id:", member.id)
    Restangular.all("user_boards").remove({
      card_id: card_id,
      user_id: member.id
    })
    .then(function() {
      var index = $scope.board.members.indexOf(member);
      $scope.board.members.splice(index, 1);
    })
  }

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









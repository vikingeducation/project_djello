djello.controller('listCtrl', 
  ['$scope', 
   'board',
   'boards',
   'lists', 
   'Restangular', 
   '$stateParams', 
   'currentUser',
   'users',
 function($scope, board, boards, lists, Restangular, $stateParams, currentUser, users) {
  $scope.board = board;
  $scope.boards = boards;
  $scope.lists = lists;
  $scope.currentUser = currentUser;
  $scope.users = users;
  $scope.edit = false;
  $scope.listForm = {};
  $scope.showEditListForm = {};

  $scope.updateBoard = function() {
    board.put();
    $scope.showBoardForm = false;
  }

  $scope.createList = function(){
    board.all('lists').post({
      list: {
        name: $scope.listForm.name,
        board_id: $stateParams.id
      }
    })
    .then(function(newList){
      $scope.lists.push(newList);
      $scope.listForm.name = "";
      $scope.showListForm = false;
    })
  }

  $scope.updateList = function(list) {
    // board.one('lists', list.id).({
    //   list: {
    //     name: $scope.listForm.name,
    //     board_id: $stateParams.id
    //   }
    // })
    list.put();
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

    board.all('cards').post({
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
    board.one('cards', card.id).remove().then(function(deletedCard){
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









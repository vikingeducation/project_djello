djello.controller('listCtrl', ['$scope', 'board', 'lists', 'Restangular', '$stateParams', 'currentUser',
 function($scope, board, lists, Restangular, $stateParams, currentUser) {
  $scope.board = board;
  $scope.lists = lists;
  $scope.edit = false;
  $scope.currentUser = currentUser;
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
      card.name = editCard.name;
      card.content = editCard.content;
      card.put();
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
    .then(function(response){
      list.cards = list.cards || [];
      list.cards.push(response);
      $scope.card = {};
    })
  }

  $scope.setList = function(list) {
    $scope.curList = list;
  }

  $scope.setCard = function(card) {
    $scope.modalCard = card;
  }

}])









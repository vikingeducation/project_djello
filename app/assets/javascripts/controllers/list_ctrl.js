djello.controller('listCtrl', ['$scope', 'lists', 'Restangular', '$stateParams', '$state',
 function($scope, lists, Restangular, $stateParams, $state) {
  $scope.lists = lists;
  $scope.edit = false;


  $scope.createList = function(newName){
    var post = Restangular.one('boards', $stateParams.id).all('lists').post({
      list: {
        name: newName,
        board_id: $stateParams.id
      }
    })

    post.then(function(response){
      $scope.lists.push(response)
    })
  }

  $scope.setEdit = function(card){

    $scope.editCard = {}
    $.extend($scope.editCard, card)
    $scope.edit = true
  }

  $scope.cancelEdit = function(){
    $scope.edit = false

  }

  $scope.addMember = function(member, list, card){
    Restangular.all('members').post({
      user_id: member.id,
      card_id: card.id
    })

    .then(function(newCard){
      var listIdx = $scope.lists.indexOf(list)
      var cardIdx = list.cards.indexOf(card)
      $scope.lists[listIdx].cards[cardIdx] = newCard
      $scope.modalCard = newCard
    })
  }

  $scope.removeMember = function(member, list, card){
      params = {user_id: member.id, card_id: card.id}
    Restangular.all('members').remove(params)


    .then(function(newCard){

      var listIdx = $scope.lists.indexOf(list)
      var cardIdx = list.cards.indexOf(card)
      $scope.lists[listIdx].cards[cardIdx] = newCard
      $scope.modalCard = newCard
    })
  }


  $scope.submitEdit = function(editCard, card){
    console.log(editCard)
    var put = Restangular.one('boards', $stateParams.id).one('cards', card.id);
    put.name = editCard.name;
    put.content = editCard.content;
    put.put()

    .then(function(response){
      var list = $.grep($scope.lists, function(val){
                    return val.id == response.list_id
                  })[0]
      var idx = list.cards.indexOf(card);
      list.cards[idx] = response;
    })
    //
    //
    $scope.edit = false
  }

  $scope.createCard = function(cardForm, list){

    var post = Restangular.one('boards', $stateParams.id).all('cards').post({
      card: {
        name: cardForm.name,
        content: cardForm.content,
        list_id: list.id
      }
    })

    post.then(function(response){
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

  $scope.completeTask = function(card){
    var put = Restangular.one('boards', $stateParams.id).one('cards', card.id);
    put.completed = true
    put.put()

    .then(function(response){
      var list = $.grep($scope.lists, function(val){
                    return val.id == response.list_id
                  })[0]
      var idx = list.cards.indexOf(card);
      list.cards[idx] = response;
    })
    //
    //
    $scope.edit = false
  }

  $scope.revertCompleteTask = function(card){
    var put = Restangular.one('boards', $stateParams.id).one('cards', card.id);
    put.completed = false
    put.put()

    .then(function(response){
      var list = $.grep($scope.lists, function(val){
                    return val.id == response.list_id
                  })[0]
      var idx = list.cards.indexOf(card);
      list.cards[idx] = response;
    })
    //
    //
    $scope.edit = false
  }

}])









djello.controller('listCtrl', ['$scope', 'lists', 'Restangular', '$stateParams',
 function($scope, lists, Restangular, $stateParams) {
  $scope.lists = lists;


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

  $scope.createCard = function(cardForm, list){
    console.log("list", list);
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

}])









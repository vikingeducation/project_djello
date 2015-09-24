djello.controller('boardShowCtrl',
  ['$scope', '$location', '$stateParams','$document','loginService', 'showresponse', 'Restangular', 'dataService', 'ModalService',
   function($scope, $location, $stateParams, $document, loginService, showresponse, Restangular, dataService, ModalService){

  // ==============initial variable settings ===============

  console.log("boardShowCtrl initiated");
  $scope.user = loginService.signedInUser.user;

  $scope.board = JSON.parse(showresponse.board);
  $scope.lists = JSON.parse(showresponse.lists);

  // ==============all board methods===============

  $scope.deleteBoard = function(){
    Restangular.one('boards', $scope.board.id).remove();
    dataService.deleteBoard($scope.board);
    $location.path('/board');
  };

  var oldTitle = "";

  $scope.editorBoardTitle = function(input){
    if (input == 'cancel' && $scope.BoardTitleEnabled) {
      $scope.board.title = oldTitle;
    }
    else if (input == 'saved' && $scope.BoardTitleEnabled){
      var oldboard = Restangular.one('boards', $scope.board.id);
      oldboard.title = $scope.board.title;
      oldboard.put().then(
        dataService.updateBoard(oldboard)
        );
    }
    oldTitle = $scope.board.title;
    $scope.BoardTitleEnabled=!$scope.BoardTitleEnabled;

  };

  // ==============all list methods===============
  var oldList = {};

  $scope.editorListTitle = function(index, input){
    if (input == 'cancel' && $scope.ListEditEnabled) {
      $scope.lists[index].title = oldList.title;
      $scope.lists[index].description = oldList.description;
    }
    else if (input == 'saved' && $scope.ListEditEnabled){
      oldList = Restangular.one('lists', $scope.lists[index].id);
      oldList.title = $scope.lists[index].title;
      oldList.description = $scope.lists[index].description;
      oldList.put();
    }
    oldList = { id:  $scope.lists[index].id,
      title: $scope.lists[index].title,
      description: $scope.lists[index].description};
      $scope.ListEditEnabled=!$scope.ListEditEnabled;

    };

  $scope.deleteList= function(index){
    Restangular.one('lists', $scope.lists[index].id).remove();
    $scope.lists.splice(index, 1);
  };

  $scope.newList = function(){
    console.log('list create');
    Restangular.all('lists').post(
          { list: {  title: 'Blank List' ,
                    description: 'insert description here',
                    board_id: $scope.board.id }})
              .then(function(createdList){
                createdList.cards = [];
                $scope.lists.push(createdList);
                  });
  };

  // console.log("lists", $scope.lists);
  // ==============all card methods===============

  $scope.newCard = function(index){
    var listId = $scope.lists[index].id;
    Restangular.one('lists', listId).all('cards').post(
          { card: {  title: 'Blank Card' ,
                    description: 'card task details here',
                    list_id: listId }})
            .then(function(createdCard){
                $scope.lists[index].cards.push(createdCard);
                  });
  };

  var findList = function (listId){
    for(var i =0; i < $scope.lists.length; i++){
      if($scope.lists[i].id == listId){
        return $scope.lists[i];
      }
    }
  };

  $scope.editCard = function(card){
    console.log("card in edit is" , card);
    list = findList(card.list_id);
    ModalService.showModal({
      templateUrl: "/templates/cardModal.html",
      controller: "cardModalCtrl",
      inputs: {
        card: card,
        list: list
      }
    }).then(function(modal) {

      //it's a bootstrap element, use 'modal' to show it
      modal.element.modal();
      modal.close.then(function(result) {
        console.log(result);
      });
    });

  };

}]);



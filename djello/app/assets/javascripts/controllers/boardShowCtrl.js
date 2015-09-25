djello.controller('boardShowCtrl',
  ['$scope', '$location', '$stateParams','$document','loginService', 'showresponse', 'Restangular', 'dataService', 'ModalService',
   function($scope, $location, $stateParams, $document, loginService, showresponse, Restangular, dataService, ModalService){

    console.log("boardShowCtrl initiated");
  $scope.user = loginService.signedInUser.user;
  var oldTitle = "";

  $scope.board = JSON.parse(showresponse.board);
  $scope.lists = JSON.parse(showresponse.lists);

  // ==============all board methods===============

  $scope.deleteBoard = function(){
    Restangular.one('boards', $scope.board.id).remove();
    dataService.deleteBoard($scope.board);
    $location.path('/board');
  };

  $scope.editorBoardTitle = function(input){
   //use diff. var.
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

  $scope.editorListTitle = function(list, index, input){
    if (input == 'cancel' && $scope.ListEditEnabled) {
        $scope.lists[index].title = oldList.title;
        $scope.lists[index].description = oldList.description;

      }
      else if (input == 'saved' && $scope.ListEditEnabled && $scope.ListId == list.id){
        oldList = Restangular.one('lists', $scope.lists[index].id);
        oldList.title = $scope.lists[index].title;
        oldList.description = $scope.lists[index].description;
        oldList.put();
        
        
      }
      oldList = { id:  $scope.lists[index].id,
                  title: $scope.lists[index].title,
                  description: $scope.lists[index].description};
      $scope.ListEditEnabled=!$scope.ListEditEnabled;
      $scope.ListId = list.id;
  };

  $scope.deleteList= function(index){
    Restangular.one('lists', $scope.lists[index].id).remove();
    $scope.lists.splice(index, 1);
  };

  $scope.newList = function(){
    console.log('list create');
    Restangular.all('lists').post(
          { list: {  title: 'Blank List' ,
                    description: 'Add list description here',
                    board_id: $scope.board.id }})
              .then(function(createdList){
                createdList.cards = [];
                $scope.lists.push(createdList);
                  });
  };

  console.log("lists", $scope.lists);

  // ==============all card methods===============
  $scope.completeCard = function(card, index){
   
    Restangular.one('lists', card.list_id).one('cards', card.id).remove();
    for(var j=0; j < $scope.lists.length; j++){
      for(var i=0; i < $scope.lists[j].cards.length; i++){
        if ($scope.lists[j].cards[i].id == card.id) {
          $scope.lists[j].cards.splice(i,1);
          break;
        }
      }
    }
  };

  $scope.newCard = function(list, index){
    
    Restangular.one('lists', list.id).all('cards').post(
          { card: {  title: 'Blank Card' ,
                    description: 'Add card description here',
                    list_id: list.id }})
            .then(function(createdCard){
                $scope.lists[index].cards.push(createdCard);
                  });
  };

  $scope.editCard = function(card){
      console.log("card in edit is" , card);
      ModalService.showModal({
      templateUrl: "/templates/cardModal.html",
      controller: "cardModalCtrl",
      inputs: {
        card: card,
        users: dataService.users.allUsers
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



app.controller("CardsNewCtrl",
              ["$scope", "Restangular", "BoardService", '$state', '$stateParams',
              function($scope, Restangular, BoardService, $state, $stateParams){

  $scope.selectedList = parseInt($stateParams.listId);

  $scope.createCard = function(card) {

    if (!card) return;

    card.list_id = $scope.listId;
    card.completed = false;

    Restangular.all('cards').post( { card : card} )
      .then(function(response){
        for (var i = 0; i < BoardService.boards.list[$scope.boardIndex].lists.length; i++) {
          if (BoardService.boards.list[$scope.boardIndex].lists[i].id === $scope.listId) {
            BoardService.boards.list[$scope.boardIndex].lists[i].cards.push(response)
            $state.go("app.boards")
          }
        };

      });

  }

}])
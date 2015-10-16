djello.controller('BoardsShowCtrl',
  [ '$scope', 'board', 'Restangular', '$state',
  function($scope, board, Restangular, $state) {

    $scope.board = board;

    $scope.newBoard = { title: 'New Board' };
    $scope.createBoard = function() {
      Restangular.all('boards').post($scope.newBoard)
        .then( function(response) {
          // what happens if this fails to create new board?
          $state.go('boards.show', ({id: response.id}) )
        } );
    }


    $scope.destroy = function(board) {
      board.remove().then( function() {
        console.log('deleted')
      })
    }

}]);
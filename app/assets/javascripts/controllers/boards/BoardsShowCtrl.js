djello.controller('BoardsShowCtrl',
  [ '$scope', 'board', 'boards', 'Restangular', '$state',
  function($scope, board, boards, Restangular, $state) {

    $scope.boards = boards;
    $scope.board = board;
    $scope.selected = board.id;

    $scope.newBoard = { title: 'New Board ' + Math.floor(Math.random() * 1000) };
    $scope.createBoard = function() {
      Restangular.all('boards').post($scope.newBoard)
        .then( function(response) {
          // what happens if this fails to create new board?
          $scope.boards.push(response);
          $state.go('boards.show', ({id: response.id}) );
        } );
    };


    $scope.destroy = function(board) {

      board.remove().then( function() {

        $scope.boards = $scope.boards.filter( function(obj) {
          return obj.id !== board.id
        });

        // this is making the ajax call but not actually going?
        $state.go('boards.show', ({id: $scope.boards[0].id}) );
      })
    };


    $scope.goTo = function(selected) {
      $state.go('boards.show', ({id: selected}) );
    };

}]);
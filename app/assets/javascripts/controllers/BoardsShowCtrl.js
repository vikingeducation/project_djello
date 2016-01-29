djello.controller('BoardsShowCtrl',
  ['$scope', 'board', 'boards', 'Restangular', '$state',
  function($scope, board, boards, Restangular, $state) {

    $scope.boards = boards;
    $scope.board = board;
    $scope.selected = board.id;

    $scope.newBoard = {
      title: 'New Board ' + Math.floor(Math.random() * 1000)
    };

    $scope.createBoard = function() {
      Restangular.all('boards').post($scope.newBoard)
        .then( function(response) {
          $scope.boards.push(response)
          $state.go('boards.show', ({ id: response.id }));
        } );
    };

    $scope.destroy = function(board) {
      board.remove().then( function() {
        $scope.boards = $scope.boards.filter( function(obj) {
          return obj.id !== board.id;
        });

        $state.go('boards.show', ({ id: $scope.boards[0].id }));
      });
    };

    $scope.goToBoard = function(board) {
      $state.go('boards.show', ({ id: board }));
    };

  }]);
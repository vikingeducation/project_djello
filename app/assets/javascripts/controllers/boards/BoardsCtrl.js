djello.controller('BoardsCtrl',
  [ '$scope', 'boards', 'Restangular', '$state', '$stateParams', 'boardService', 'listService',
  function($scope, boards, Restangular, $state, $stateParams, boardService, listService) {

    boardService.setBoards(boards);


    $scope.setVariables = function(board) {
      $scope.boards = boardService.boards;

      if (board) {
        $scope.board = board;
      } else {
        $scope.board = boardService.first();
      };

      $scope.lists = listService.getLists($scope.board);

      $scope.selected = $scope.board.id;
      $scope.editorEnabled = false;
    };


    $scope.createBoard = function() {
      Restangular.all('boards').post()
        .then( function(response) {
          boardService.add(response);
          $scope.setVariables(response);
      });
    };


    $scope.destroy = function(board) {
      board.remove().then( function() {

        $scope.boards = $scope.boards.filter( function(obj) {
          return obj.id !== board.id
        });

        boardService.remove(board);
        $scope.setVariables();
      })
    };


    $scope.goTo = function(selected) {
      $scope.setVariables( boardService.findByID($scope.selected) );
    };


    $scope.createList = function() {
      listService.create($scope.board)
        .then( function(response) {
          boardService.addList(response);
        });
    }


    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    }


    $scope.saveEditor = function() {
      $scope.editorEnabled = false;
    }


    $scope.setVariables();

}]);
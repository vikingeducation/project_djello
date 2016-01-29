djello.controller('BoardsCtrl',
  ['$scope', '$window', 'boards', 'Restangular', '$state', '$stateParams', 'boardService', 'listService',
  function($scope, $window, boards, Restangular, $state, $stateParams, boardService, listService) {

    boardService.setBoards(boards);

    $scope.initVariables = function(board) {
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
          $scope.initVariables(response);
        });
    };

    $scope.destroy = function(board) {
      board.remove().then( function() {
        $scope.boards = $scope.boards.filter( function(obj) {
          return obj.id !== board.id;
        });
      });
    };

    $scope.findBoard = function(selected) {
      $scope.initVariables( boardService.findByID($scope.selected) );
    };

    $scope.createList = function() {
      listService.create($scope.board)
        .then( function(response) {
          boardService.addList(response);
        });
    };

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    };

    $scope.saveEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.deleteList = function(list) {
      if ($window.confirm('Do you want to delete this list?')) {
        Restangular.one('lists', list.id).remove()
          .then( function() {
            $scope.lists = boardService.removeList(list);
          });
      };
    };

    $scope.initVariables();

  }]);
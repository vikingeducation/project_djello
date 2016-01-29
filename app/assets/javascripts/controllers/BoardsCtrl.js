djello.controller('BoardsCtrl',
  ['$scope', 'boards', 'Restangular', '$state', '$stateParams', 'boardService', 'listService',
  function($scope, boards, Restangular, $state, $stateParams, boardService, listService) {

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
      listService.create($scope.board);
    };

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
      console.log('editor enabled');
    };

    $scope.saveEditor = function() {
      $scope.editorEnabled = false;
      console.log('save')
    };

    $scope.initVariables();

  }]);
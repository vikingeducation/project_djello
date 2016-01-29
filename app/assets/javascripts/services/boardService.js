djello.factory('boardService',
  ['Restangular',
  function(Restangular) {

    var boardService = {};

    boardService.boards = [];

    boardService.setBoards = function(boards) {
      this.boards = boards;
    };

    boardService.first = function() {
      return this.boards[0];
    };

    boardService.findByID = function(id) {
      return this.boards.filter( function(board) {
        return (board.id === Number(id))
      })[0];
    };

    boardService.add = function(board) {
      this.boards.push(board);
    };

    boardService.remove = function(toRemove) {
      this.boards = this.boards.filter( function(board) {
        return board.id !== toRemove.id
      });
    };

    return boardService;

  }]);
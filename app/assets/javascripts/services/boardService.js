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


    boardService.remove = function(removed) {
      this.boards = this.boards.filter( function(board) {
        return board.id !== removed.id
      });
    };


    boardService.addList = function(list) {
      var board = boardService.findByID(list.board_id);
      board.lists.push(list);
    };


    boardService.removeList = function(list) {
      var board = boardService.findByID(list.board_id);
      board.lists = board.lists.filter( function(obj) {
        return obj.id !== list.id
      });
      return board.lists;
    };


    return boardService;

}]);
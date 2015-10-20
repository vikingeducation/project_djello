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


    boardService.newBoard = function() {
      return { title: 'New Board ' + Math.floor(Math.random() * 1000) };
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


    return boardService;

}]);
djello.factory('boardService',
  ['Restangular', 'listService', 'cardService',
  function(Restangular, listService, cardService) {

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
      board['lists'] = board.lists || [];
      board.lists.push(list);
    };


    boardService.removeList = function(list) {
      var board = boardService.findByID(list.board_id);
      board.lists = board.lists.filter( function(obj) {
        return obj.id !== list.id
      });
      return board.lists;
    };


    boardService.addCard = function(card, board_id) {
      var board = boardService.findByID(board_id);
      var list = listService.findByID(board, card.list_id);
      list['cards'] = list.cards || [];
      list.cards.push(card);
    };

// this guy needs to be fixed
    boardService.removeCard = function(card, board_id) {
      var board = boardService.findByID(board_id);
      var list = listService.findByID(board, card.list_id);
      list.cards = list.cards.filter( function(obj) {
        return obj.id !== card.id
      });
    };


    return boardService;

}]);
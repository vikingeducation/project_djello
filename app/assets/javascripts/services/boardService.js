djello.factory('boardService',
  ['Restangular', 'listService',
  function(Restangular, listService) {

    var boardService = {};

    boardService.boards = [];
    boardService.active = null;
    // boardService.needsRefresh = false;

    boardService.setBoards = function(boards) {
      this.boards = boards;
    };

    boardService.first = function() {
      return this.boards[0];
    };

    boardService.setSelected = function(board_id) {
      this.active = this.findByID(board_id);
      return board_id;
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

    boardService.addList = function(list) {
      var board = boardService.findByID(list.board_id);
      board['lists'] = board.lists || [];
      board.lists.push(list);
    };

    boardService.removeList = function(list) {
      var board = boardService.findByID(list.board_id);
      board.lists = board.lists.filter( function(obj) {
        return obj.id !== list.id;
      });
      return board.lists;
    };

    boardService.addCard = function(card, board_id) {
      var board = boardService.findByID(board_id);
      var list = listService.findByID(board, card.list_id);
      list['cards'] = list.cards || [];
      list.cards.push(card);
    };

    boardService.removeCard = function(card, board_id) {
      var board = boardService.active;
      var list = listService.findByID(board, card.list_id);
      list.cards = list.cards.filter( function(obj) {
        return obj.id !== card.id
      });
      // boardService.needsRefresh = true;
    };

    boardService.addMember = function(response) {
      var board = boardService.active;
      var list = listService.findByID(board, response.card.list_id);
      var card = boardService.findCardByID(list, response.card.id);

      card['card_members'] = card.card_members || [];
      card.card_members.push(response);
    };

    boardService.removeMember = function(card_member) {
      var board = boardService.active;
      var list = listService.findByID(board, card_member.card.list_id);
      var card = boardService.findCardByID(list, card_member.card.id);

      card.card_members = card.card_members.filter( function(obj) {
        return obj.id !== card_member.id
      });
    };

    boardService.findCardByID = function(list, card_id) {
      return list.cards.filter( function(card) {
        return (card.id === Number(card_id))
      })[0];
    };

    return boardService;

  }]);
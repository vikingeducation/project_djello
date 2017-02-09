// ----------------------------------------
// BoardService
// ----------------------------------------

Djello.factory('BoardService',
  ['_', 'Restangular', 'ListService',
  function(_, Restangular, ListService) {

  Restangular.extendModel('boards', function(model) {
    model.createList = function(params) {
      params.board_id = model.id;
      return ListService.createList(params)
        .then(function(response) {
          Restangular.restangularizeElement(model, response, 'lists');
          model.lists.push(response);
          return response;
        });
    };
    return model;
  });

  var _restangularizeListCards = function(list) {
    list.cards = Restangular
      .restangularizeCollection(list, list.cards, 'cards');
  }

  var _restangularizeBoardLists = function(board) {
    board.lists = Restangular
        .restangularizeCollection(board, board.lists, 'lists');
    _.each(board.lists, function(list) {
      _restangularizeListCards(list);
    })
  };


  var _restangularizeBoardsLists = function(boards) {
    _.each(boards, function(board) {
      _restangularizeBoardLists(board);
    });
  };

  var BoardService = {};

  BoardService.getBoards = function(){
    return Restangular.all('boards').getList().then( function(boards) {
      _restangularizeBoardsLists(boards);
      return boards;
    })
  };

  BoardService.createBoard = function(formData){
    var board = { board: formData };
    return Restangular.all("boards").post(board);
  };

  BoardService.getBoard = function(id){
    return Restangular.one('boards', id).get().then( function(board) {
      _restangularizeBoardLists(board);
      return board;
    })
  };


  BoardService.updateBoard = function(board, formParams){
    var boardData = { board: formParams };
    return board.patch(boardData);
  };

  BoardService.deleteBoard = function(board){
    return board.remove();
  }

  return BoardService;

  }]);

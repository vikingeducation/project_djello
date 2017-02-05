// ----------------------------------------
// BoardService
// ----------------------------------------

Djello.factory('BoardService',
  ['_', 'Restangular',
  function(_, Restangular) {


  var _restangularizeBoardLists = function(board) {
    board.lists = Restangular
        .restangularizeCollection(board, board.lists, 'lists');
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


  // BoardService.updatePin = function(pin, formParams){
  //   var pinData = { pin: formParams };

  //   return pin.patch(pinData);
  // };

  BoardService.deleteBoard = function(board){
    return board.remove();
  }

  return BoardService;

  }]);

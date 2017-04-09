djello.factory('boardService',
  ['Restangular',
  function(Restangular) {

    boardService = {};

    boardService.getAll = function() {
      return Restangular.all('boards').getList();
    }

    boardService.createBoard = function(newBoard) {
      return Restangular.all('boards')
                        .post( { board: { title: newBoard.title,
                                          description: newBoard.description } } );
    }

    boardService.delete = function(board) {
      return Restangular.one('boards', board.id)
                        .remove( { id: board.id } );
    }


    return boardService;

  }])
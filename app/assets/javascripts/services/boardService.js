djello.factory('boardService',
  ['Restangular',
  function(Restangular) {

    boardService = {};

    boardService.createBoard = function(newBoard) {
      return Restangular.all('boards')
                        .post( { board: { title: newBoard.title,
                                          description: newBoard.description } } );
    }


    return boardService;

  }])
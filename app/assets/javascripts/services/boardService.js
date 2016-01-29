djello.factory('boardService',
  ['Restangular',
  function(Restangular) {

    var boardService = {};

    boardService.boards = [];

    boardService.getBoards = function() {
      Restangular.all('boards').get()
        // .then( function(response) {
        //   boardService.boards = response;
        // });
    };

    boardService.findById = function(id) {

    };

    return boardService;

  }]);
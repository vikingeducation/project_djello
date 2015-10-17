djello.factory('boardService',
  ['Restangular',
  function(Restangular) {

    var boardService = {};

    boardService.boards = [];


    boardService.getBoards = function() {
      Restangular.all('boards').get()
        //.then( function(response) {
        //  boardService.boards = response;
        //}); // index
    };


    boardService.findByID = function(id) {
      //console.log(this.boards);
    };


    return boardService;

}]);
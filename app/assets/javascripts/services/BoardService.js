djello.factory('BoardService', ['Restangular', '$state', function(Restangular, $state) {
  var _boards = [];

  var boardService = {};

  boardService.getBoards = function(){
    return Restangular.all('boards').getList().then(function(response){
      angular.copy(response, _boards)
      return _boards
    });
  };


  boardService.createBoard = function(){
    return Restangular.all('boards').post()
          .then(function(response){
            _boards.push(response);
            return response
          })
  };

  boardService.findBoard = function(id){
    return Restangular.one('boards', id).get()
  }

  // boardService.editBoard = function(board){
  //   return Restangular.
  // }

  boardService.update

  return boardService;

}]);
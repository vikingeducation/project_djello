app.factory('Boards', ['Restangular', 'Session', function(Restangular, Session){
  var boards = [];

  function getBoards(){
    Restangular.all('boards').getList().then(function(boardList){
      boards.push.apply(boards, boardList);
    })
  }

  function addBoard(board){
    boards.push(board);
  }

  return {
    boards: boards,
    getBoards: getBoards,
    addBoard: addBoard,
  }
}]);

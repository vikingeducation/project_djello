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

  function deleteBoard(board){
    boards.splice(boards.indexOf(board), 1);
  }

  return {
    boards: boards,
    getBoards: getBoards,
    addBoard: addBoard,
  }
}]);

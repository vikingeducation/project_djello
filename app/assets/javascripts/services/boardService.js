app.factory('Boards', ['Restangular', 'Session', function(Restangular, Session){
  var boards = [];

  function getBoards(){
    Restangular.all('boards').getList().then(function(boardList){
      boards.push.apply(boards, boardList);
    })
  }

  return {
    boards: boards,
    getBoards: getBoards,
  }
}]);

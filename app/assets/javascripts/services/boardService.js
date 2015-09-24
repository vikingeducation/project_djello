app.factory('Boards', ['Restangular',  function(Restangular){
  var boards = [];

  function getBoards(){
    if (boards.length == 0){
      Restangular.all('boards').getList().then(function(boardList){
        if (boards.length == 0) boards.push.apply(boards, boardList);
      })
    }
  }

  function addBoard(board){
    boards.push(board);
  }

  function deleteBoard(board){
    var index = boards.reduce(function(result, el, index){
      return el.id == board.id ? index : result
    }, -1)

    if (index >= 0) boards.splice(boards.indexOf(index), 1);
  }

  return {
    boards: boards,
    getBoards: getBoards,
    deleteBoard: deleteBoard,
    addBoard: addBoard,
  }
}]);

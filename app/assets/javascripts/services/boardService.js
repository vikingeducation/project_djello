app.factory('Boards', ['Restangular',  function(Restangular){
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
    var index = boards.reduce(function(result, el, index){
      if (el.id == board.id) return index;
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

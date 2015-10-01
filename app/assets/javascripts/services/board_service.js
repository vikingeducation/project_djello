djello.factory('boardService', ['Restangular', function(Restangular){
  var boards = {};
  var currentBoard = {};

  function getBoards() {
    Restangular.all('boards').getList().then(function(boardList){
      boards.boardList = boardList;
    }, function(error){
      console.log('Fail to get boards: ', error);
    })
  }

  function getBoard(board_id) {
    Restangular.one('boards', board_id).get().then(function(data){
      currentBoard.data = data;
    }, function(error){
      alert('Fail to get this board: ' + error);
    })
  }

  function createBoard(boardForm) {
    Restangular.all('boards').post(boardForm).then(function(board){
      boards.boardList.push(board);
      for (var key in boardForm) {
        boardForm[key] = null;
      }
    }, function(error){
      console.log('Create board Failed: ', error);
    })
  }

  function updateBoard(board) {
    board.data.put();
  }

  function removeBoard(board) {
    board.remove().then(function(){
      boards.boardList.splice(boards.boardList.indexOf(board), 1)
    }, function(error){
      console.log('Fail to remove board: ', error);
    })
  }

  return {
    boards: boards,
    currentBoard: currentBoard,
    getBoards: getBoards,
    getBoard, getBoard,
    createBoard: createBoard,    
    updateBoard: updateBoard,
    removeBoard: removeBoard
  } 
}])
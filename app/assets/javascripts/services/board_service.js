Djello.factory('BoardService', [
  'Restangular',
  function(Restangular) {

    var _boards = [];

    var getAllBoards = function() {
      return Restangular.all("boards").getList().then(function(response) {
        angular.copy(response, _boards)
        return _boards
      })
    };

    var createBoard = function(data) {
      return Restangular.all("boards").post(data).then(function(response) {
        _boards.push(response)
        return response
      })
    };

    var getBoard = function(id) {
      return Restangular.one('boards', id).get();
    };

    var changeBoard = function(board, title) {
      var data = {
        board: {
          title: title
        }
      }
      return board.patch(data);
    }

    var deleteBoard = function(board) {
      board.remove().then(function(response) {
        _boards = _.without(_boards, response)
      })
    }

    return {getAllBoards: getAllBoards, createBoard: createBoard, getBoard: getBoard, deleteBoard: deleteBoard, changeBoard: changeBoard};

  }
])

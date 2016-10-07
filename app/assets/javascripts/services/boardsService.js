app.factory("boardsService", ["Restangular", function(Restangular) {

  var boardsService = {}

  var _boards = []

  boardsService.all = function() {
    return Restangular.all('boards').getList().then(function(response) {
      console.log(response)
      return angular.copy(response, _boards)
    })
  }

  var _createBoard = function(params) {
    return Restangular.all('boards').post({
      board: {
        title: params.title,
        description: params.description
      }
    }).then(function(response) {
      console.log(response)
      _boards.unshift(response)
      return _boards
    })
  }

  Restangular.extendCollection('boards', function(collection) {
    collection.create = _createBoard;
    return collection
  })

  boardsService.create = function(params) {
    return _createBoard(params)
  }

  boardsService.find = function(id) {
    console.log("finding board...")
    for (var i = 0; i < _boards.length; i++) {
      var _thisBoard = _boards[i]
      console.log(_thisBoard.id, id)
      // console.log(id)
      if (_thisBoard.id === parseInt(id)) {
        return _thisBoard
      }
    }  
  }
    
  return boardsService
  
}])
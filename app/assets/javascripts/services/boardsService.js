app.factory("boardsService", ["Restangular", function(Restangular) {

  var boardsService = {}

  boardsService.all = function() {
    return Restangular.all('boards').getList()
  }

  var _createBoard = function(params) {
    return Restangular.all('boards').post({
      board: {
        title: params.title,
        description: params.description
      }
    }).then(function(response) {
      console.log(response)
      return _boards
    })
  }

  Restangular.extendCollection('boards', function(collection) {
    collection.create = _createBoard
    return collection
  })

  boardsService.create = function(params) {
    return _createBoard(params)
  }
    
  return boardsService
  
}])
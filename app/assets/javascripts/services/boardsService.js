app.factory("boardsService", ["Restangular", function(Restangular) {

  var boardsService = {}

  boardsService.all = function() {
    return Restangular.all('boards').getList()
  }

  var _boards

  var _createBoard = function(params) {
    return Restangular.all('boards').post({
      post: {
        title: params.title,
        description: params.description,
        members: params.members
      }
    }).then(function(response) {
      console.log(response)
      _boards.unshift(response)
      return _boards
    })
  }

  Restangular.extendCollection('boards', function(collection) {
    collection.create = _createBoard
    return collection
  })
    
  return boardsService
  
}])
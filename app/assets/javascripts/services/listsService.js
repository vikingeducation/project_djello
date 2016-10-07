app.factory("listsService", ["Restangular", function(Restangular) {

  var listsService = {}

  var _lists = []

  listsService.all = function(board) {
    return Restangular.one('boards', board.id).all('lists').getList().then(function(response) {
      console.log(response)
      return angular.copy(response, _lists)
    })
  }

  return listsService

}])
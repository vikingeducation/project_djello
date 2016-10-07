app.factory("listsService", ["Restangular", function(Restangular) {

  var listsService = {}

  var _lists = []


  var _createList = function(board, newList) {
    return Restangular.one("boards", board.id).all('lists').post({
      list: {
        title: newList.title,
        description: newList.description
      }
    }).then(function(response) {
      console.log(response)
      _lists.push(response)
      return _lists
    })
  }

  Restangular.extendCollection('lists', function(collection) {
    collection.create = _createList;
    return collection
  })

  listsService.create = function(board, newList) {
    return _createList(board, newList)
  }



  listsService.all = function(board) {
    return Restangular.one('boards', board.id).all('lists').getList().then(function(response) {
      console.log(response)
      return angular.copy(response, _lists)
    })
  }


  listsService.editTitle = function(list, newTitle) {
    return list.patch({list: {title: newTitle}})
  }

  listsService.editDescription = function(list, newDescription) {
    return list.patch({list: {description: newDescription}})
  }


  return listsService

}])
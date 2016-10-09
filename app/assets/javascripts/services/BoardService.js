djello.factory('BoardService', ['Restangular', 'ListService', '$state', function(Restangular, ListService, $state) {
  var _boards = [];

  var boardService = {};

  boardService.getBoards = function(){
    return Restangular.all('boards').getList().then(function(response){
      angular.copy(response, _boards)
      return _boards
    });
  };


  boardService.createBoard = function(title){
    return Restangular.all('boards').post({
      title: title
    })
          .then(function(response){
            _boards.push(response);
            return response
          })
  };

  

  boardService.findBoard = function(id){
    return Restangular.one('boards', id).get()
          .then(function(response){
            Restangular.restangularizeCollection(null, response.lists, 'lists');
            return response;
          })
  };

  Restangular.extendModel('boards', function(model){
    model.createList = function(params){
      return ListService.createList(params)
      .then(function(response){
        model.lists.push(response);
      });
    };
    return model;
  })

  return boardService;

}]);
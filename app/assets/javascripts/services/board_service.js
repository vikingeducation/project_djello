app.factory("boardService", ['Restangular', function(Restangular){

  var service = {};

  service.getBoards = function(){
    return Restangular.all("boards").getList();
  };

  service.getBoard = function(id){
    return Restangular.one("boards", id).get();
  };

  service.createBoard = function(data){
    var boardData = { board: data };
    return Restangular.all("boards").post(boardData);

  };

  return service;

}])
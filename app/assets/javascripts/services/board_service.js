app.factory("boardService", ['Restangular', function(Restangular){

  var service = {};

  service.getBoards = function(){
    return Restangular.all("boards").getList();
  };

  service.getBoard = function(id){
    return Restangular.one("boards", id).get();
  };

  return service;

}])
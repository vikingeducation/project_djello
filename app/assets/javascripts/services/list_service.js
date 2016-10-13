app.factory("listService", ['Restangular', function(Restangular){

  var service = {};

  service.createList = function(listData){
    var list = { list: listData };
    return Restangular.all("lists").post(list);
  };

  service.deleteList = function(id){
    return Restangular.one('lists', id).remove();
  };

  return service;

}])
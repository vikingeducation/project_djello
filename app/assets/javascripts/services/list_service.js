app.factory("listService", ['Restangular', function(Restangular){

  var service = {};

  service.createList = function(listData){
    var list = { list: listData };
    return Restangular.all("lists").post(list);
  };

  return service;

}])
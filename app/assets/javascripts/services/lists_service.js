djello.factory('ListsService', ['Restangular', function(Restangular) {


  var obj = {};


  obj.createList = function(listObj) {
    return Restangular.all('lists').post(listObj);
  }


  return obj;

}])
djello.factory('ListsService', ['Restangular', function(Restangular) {


  var obj = {};

  obj.currentLists;


  obj.createList = function(listObj) {
    return Restangular.all('lists').post(listObj);
  }


  obj.deleteList = function(list) {
    Restangular.one('lists', list.id).remove().then(
      function(list) {
        for (var i = 0; i < obj.currentLists.length; i++) {
          if (list.id == obj.currentLists[i].id) {
            obj.currentLists.splice(i, 1);
          }
        }
      }

    );
  }


  return obj;

}])
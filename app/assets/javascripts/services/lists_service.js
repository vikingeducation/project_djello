djello.factory('ListsService', ['Restangular', function(Restangular) {


  var obj = {};

  obj.currentLists = [];


  obj.createList = function(listObj) {
    Restangular.all('lists').post(listObj).then(
      function(newList) {
        console.log("newList: ")
        console.log(newList)
        obj.currentLists.push(newList);
        console.log(obj.currentLists)
      }
    );
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
    )
  };


  obj.updateList = function(list) {
    Restangular.one('lists', list.id).patch(list).then(
      function(updatedList) {
        for (var i = 0; i < obj.currentLists.length; i++) {
          if (updatedList.id == obj.currentLists[i].id) {
            obj.currentLists.splice(i, 1, updatedList)
          }
        }

      });
  }


  return obj;

}])
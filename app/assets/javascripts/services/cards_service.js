djello.factory('CardsService', ['Restangular', 'ListsService', function(Restangular, ListsService) {

  var obj = {};


  obj.currentLists = ListsService.currentLists;


  obj.getCurrentList = function(allLists, listId) {
    return _.filter(allLists, {id: listId})[0];
  }


  obj.getCurrentCard = function(allCards, cardId) {
    return _.filter(allCards, {id: cardId})[0];
  }


  obj.createCard = function(cardObj) {
    return Restangular.all('cards').post(cardObj);
  }


  obj.updateCard = function(cardObj) {
    var id = cardObj["id"]
    delete cardObj["id"]
    delete cardObj["created_at"]
    delete cardObj["updated_at"]
    console.log(cardObj)
    return Restangular.one('cards', id).patch(cardObj)
  }

// obj.update = function(item, obj){
//         console.log(obj, obj.id);
//       Restangular.one(item, obj.id).get().then(function(object){
//           object.title = obj.title;
//           if(object.description){
//               object.description = obj.description;
//           }
//           object.put();
//       })
//     };


  return obj;

}])
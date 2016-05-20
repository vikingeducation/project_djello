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
    console.log(cardObj)
    return Restangular.one('cards', cardObj.id).patch(cardObj)
  };


  obj.deleteCard = function(cardObj) {
    return Restangular.one('cards', cardObj.id).remove();
  }


  return obj;

}])
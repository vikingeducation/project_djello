djello.factory('CardsService', ['Restangular', function(Restangular) {

  var obj = {};


  obj.getCurrentList = function(allLists, listId) {
    return _.filter(allLists, {id: listId})[0];
  }


  obj.getCurrentCard = function(allCards, cardId) {
    return _.filter(allCards, {id: cardId})[0];
  }




  return obj;

}])
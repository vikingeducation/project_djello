app.factory("cardService", ['Restangular', '_', function(Restangular, _){

  var service = {};

  service.createCard = function(cardData){
    var card = { card: cardData };

    return Restangular.all("cards").post(card);
  }

  service.workingCards = function(cards){
    var working = [];
    cards.forEach(function(card){
      if(card.completed === false){
        working.push(card);
      }
    })

    return working;
  };

  return service;

}])
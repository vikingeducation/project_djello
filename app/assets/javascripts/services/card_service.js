app.factory("cardService", ['Restangular', function(Restangular){

  var service = {};

  service.createCard = function(cardData){
    var card = { card: cardData };

    return Restangular.all("cards").post(card);
  }

  return service;

}])
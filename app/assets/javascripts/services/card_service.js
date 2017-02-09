// ----------------------------------------
// CardService
// ----------------------------------------

Djello.factory('CardService',
  ['_', 'Restangular',
  function(_, Restangular) {

  var CardService = {};

  CardService.createCard = function(formData){
    var card = { card: formData };
    return Restangular.all("cards").post(card);
  };

  CardService.updateCard = function(card, formParams){
    var cardData = { "card": formParams };
    return card.patch(cardData);
  };

  return CardService;

  }]);

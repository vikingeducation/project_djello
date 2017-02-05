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

  return CardService;

  }]);

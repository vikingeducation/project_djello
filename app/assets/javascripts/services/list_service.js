// ----------------------------------------
// ListService
// ----------------------------------------

Djello.factory('ListService',
  ['_', 'Restangular', 'CardService',
  function(_, Restangular, CardService) {

  Restangular.extendModel('lists', function(model) {
    model.createCard = function(params) {
      params.list_id = model.id;
      return CardService.createCard(params)
        .then(function(response) {
          model.cards.push(response);
          return response;
        });
    };
    return model;
  });

  var ListService = {};

  ListService.createlist = function(formData){
    var list = { list: formData };
    return Restangular.all("lists").post(list);
  };

  return ListService;

  }]);

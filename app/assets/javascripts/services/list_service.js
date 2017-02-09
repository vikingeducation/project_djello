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
          Restangular.restangularizeElement(model, response, 'cards');
          model.cards.push(response);
          return response;
        });
    };
    return model;
  });

  var ListService = {};

  ListService.createList = function(formData){
    var list = { list: formData };
    return Restangular.all('lists').post(list);
  };

  ListService.updateList = function(list, formParams){
    var listData = { "list": formParams };
    return list.patch(listData);
  };

  return ListService;

  }]);

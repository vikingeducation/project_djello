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
          model.cardParams = {};
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

  ListService.updateCardActivity = function(lists, list_id, card){
    target_list = _.find(lists, function(l) { return l.id === list_id})
    if (target_list == undefined) return;
    target_card = _.find(target_list.cards, function(c) { return c.id === card.id})
    if (target_card != undefined) {
      angular.copy(card, target_card);
    }
    return;
  }

  return ListService;

  }]);

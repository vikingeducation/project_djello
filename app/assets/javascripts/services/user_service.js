// ----------------------------------------
// UserService
// ----------------------------------------

Djello.factory('UserService',
  ['_', 'Restangular',
  function(_, Restangular) {

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

  var UserService = {};

  UserService.all = function() {
    return Restangular.all('users').getList();
  }

  return UserService;

  }]);

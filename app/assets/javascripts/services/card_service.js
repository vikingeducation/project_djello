Djello.factory('CardService', [
  'Restangular',
  function(Restangular) {

    var _cards = [];

    var getAllCards = function(list_id) {
      return Restangular.all("cards").getList("list", {id: list_id}).then(function(response) {
        angular.copy(response, _cards)
        return _cards
      })
    };

    var createCard = function(list_id, data) {
      var data = {
        card: {
          title: data.title
        }
      }
      return Restangular.one("lists", list_id).post('cards', data)
    };

    return {getAllCards: getAllCards, createCard: createCard}

  }
])

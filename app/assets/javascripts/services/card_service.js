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

    var changeCard = function(card_id, edit) {
      var data = {}
      data['card'] = edit;
      return Restangular.one('cards', card_id).patch(data)
    }

    var deleteCard = function(card_id) {
      return Restangular.one('cards', card_id).remove();
    }


    return {getAllCards: getAllCards, createCard: createCard, changeCard: changeCard, deleteCard: deleteCard}

  }
])

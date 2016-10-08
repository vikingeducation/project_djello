app.factory("cardService", ["Restangular", function(Restangular) {
  var cardService = {}

  var _cards = []

  var _createCard = function(list, newCard) {
    return Restangular.one("lists", list.id).all('cards').post({
      card: {
        title: newCard.title,
        text: newCard.text
      }
    }).then(function(response) {
      console.log(response)
      _cards.push(response)
      return _cards
    })
  }

  Restangular.extendCollection('lists', function(collection) {
    collection.create = _createCard;
    return collection
  })

  cardService.create = function(list, newCard) {
    return _createCard(list, newCard)
  }


  return cardService
}])
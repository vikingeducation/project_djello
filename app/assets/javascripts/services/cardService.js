app.factory("cardService", ["Restangular", function(Restangular) {
  var cardService = {}

  var _cards = []

  var _createCard = function(list, newCard, teamMembers) {
    var selectedMembers = []
    if (newCard.members.length) {
      for (var i = 0; i < newCard.members.length; i++) {
        var thisMember = newCard.members[i]
        if (thisMember) {
          selectedMembers.push(teamMembers[i])
        }
      }
    }
    return Restangular.one("lists", list.id).all('cards').post({
      card: {
        title: newCard.title,
        text: newCard.text, 
        members: selectedMembers
      }
    }).then(function(response) {
      _cards.push(response)
      return _cards
    })
  }

  Restangular.extendCollection('lists', function(collection) {
    collection.create = _createCard;
    return collection
  })

  cardService.create = function(list, newCard, teamMembers) {
    return _createCard(list, newCard, teamMembers)
  }

  cardService.editTitle = function(card, newTitle, list) {
    Restangular.restangularizeElement(list, card, 'cards')
    return card.patch({card: {title: newTitle}})
  }

  cardService.editText = function(card, newText, list) {
    Restangular.restangularizeElement(list, card, 'cards')
    return card.patch({card: {text: newText}})
  }

  cardService.completeCard = function(card, list) {
    Restangular.restangularizeElement(list, card, 'cards')
    return card.patch({card: {completed: true}})
  }
  cardService.uncompleteCard = function(card, list) {
    Restangular.restangularizeElement(list, card, 'cards')
    return card.patch({card: {completed: false}})
  }

  cardService.updateCardMembers = function(card, updatedMembers) {
    Restangular.restangularizeElement(null, card, 'cards');
    return card.patch({members: updatedMembers})
  }

  return cardService
}])
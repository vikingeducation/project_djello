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

  CardService.destroyMember = function(card, member){
    return card.customDELETE('destroy_member', {user_id: member.id });
  }

  CardService.addMember = function(card, member){
    return card.customPOST('', 'add_member', {user_id: member.id});
  }

  CardService.filterMembers = function(card, users){
    _.each(card.card_members, function(member) {
      users = _.reject(users, function(user) { return user.id === member.id });
    })
    return users;
  }

  return CardService;

  }]);

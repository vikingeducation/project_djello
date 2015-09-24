app.factory('Cards', ['Restangular',  function(Restangular){
  function addCard(card, callback){
    Restangular.all('cards').post({card: card}).then(function(res){
      callback(res);
    }, function(fail){
      console.log(fail);
    })
  }

  function editCard(card, callback){
    Restangular.one('cards', card.id).patch({card: card}).then(function(res){
      callback(res);
    }, function(fail){
      console.log(fail);
    })
  }

  function addMember(card, target, callback){
    // console.log(card, target);
    editedCard = Restangular.all('memberships').post({card_id: card.id, user_id: target.id}).then(function(res){
      console.log(res);
      callback(res);
    }, function(fail){
      console.log(fail);
    })
  }

  return {
    addCard: addCard,
    editCard: editCard,
    addMember: addMember,
  }
}]);

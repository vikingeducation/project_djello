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

  // function completeCard(card, callback){
  //   Restangular.one('cards', card)
  // }

  return {
    addCard: addCard,
    editCard: editCard,
  }
}]);

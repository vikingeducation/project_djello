app.factory('Cards', ['Restangular',  function(Restangular){

  function editCard(card, callback){
    console.log(card)
    Restangular.one('cards', card.id).patch({card: card}).then(function(res){
      console.log(res)
      callback(res);
    }, function(fail){
      console.log(fail);
    })
  }

  return {
    editCard: editCard
  }
}]);

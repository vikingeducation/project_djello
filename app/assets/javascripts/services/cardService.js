app.factory('Cards', ['Restangular',  function(Restangular){

  function editCard(card){
    console.log(card)
    Restangular.one('cards', card.id).patch({card: card}).then(function(res){
      console.log(res)
    }, function(fail){
      console.log(fail);
    })
  }

  return {
    editCard: editCard
  }
});
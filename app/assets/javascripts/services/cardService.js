djello.factory('cardService',
  ['Restangular',
  function(Restangular) {

    var cardService = {};

    cardService.cards = [];


    cardService.setCards = function(lists) {
      lists.forEach( function(list) {
        cardService.cards = cardService.cards.concat(list.cards);
      });
      return cardService.cards;
    };


    cardService.getCards = function(list) {
      return list.cards;
    };


    cardService.create = function(list) {
      return Restangular.all('cards').post( { list_id: list.id } )
    };


    cardService.findByID = function(id) {
      return cardService.cards.filter( function(card) {
        return (card.id === Number(id))
      })[0];
    };


    cardService.removeCard = function(card) {
      cardService.cards = cardService.cards.filter( function(obj) {
        return obj.id !== card.id
      });
    };


    cardService.markCompleted = function(card) {
      Restangular.one('cards', card.id).remove()
        .then( function() {
          boardService.removeCard(card);
      })
    };


    return cardService;

}]);
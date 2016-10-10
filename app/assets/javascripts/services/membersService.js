app.factory("membersService", ["Restangular", function(Restangular) {
  var membersService = {}

  membersService.getMembersByCard = function(card) {
    return Restangular.one('cards', card.id).all('users').getList().then(function(response) {
      console.log(response)
      return response
    })
  }

  return membersService
}])
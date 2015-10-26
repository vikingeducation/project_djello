djello.factory('userService',
  ['Restangular',
  function(Restangular) {

    var userService = {};
    userService.users = [];


    userService.setUsers = function(users) {
      this.users = users;
    };


    userService.excluding = function(excludedUsers) {
      var ids = excludedUsers.map( function(cardMember) { return cardMember.member.id } )
      var output = this.users.filter( function(u) {
        return ids.indexOf(u.id) < 0;
      });
      return output;
    };


    userService.create = function(card_member) {
      return Restangular.all('card_members').post( card_member )
    };


    userService.removeMember = function(card_member) {
      //var card_member = { card_id: card.id, member_id: user.id }
      return Restangular.one('card_members', card_member.id).remove()
    }


    return userService;

}])
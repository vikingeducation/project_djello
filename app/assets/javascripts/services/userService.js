djello.factory('userService', 
  ['Restangular',
  function(Restangular) {

  var userService = {};
  userService.users = [];
  userService.current_user = {};

  userService.setUsers = function(users) {
    this.users = users;
    this.current_user = users[0];
  };

  userService.excluding = function(excludedUsers) {
    var ids = excludedUsers.map( function(cardMember) { return cardMember.member.id } );
    ids.push(this.current_user.id)
    var output = this.users.filter( function(user) {
      return ids.indexOf(user.id) < 0;
    });
    return output;
  };

  userService.create = function(card_member) {
    return Restangular.all('card_members').post(card_member);
  };

  userService.remove = function(card_member) {
    return Restangular.one('card_members', card_member.id).remove();
  };

  return userService;

}]);
djello.factory('userService',
  ['Restangular',
  function(Restangular) {

    var userService = {};
    userService.users = [];

    userService.setUsers = function(users) {
      this.users = users;
    };


    userService.excluding = function(excludedUsers) {
      var ids = excludedUsers.map( function(user) { return user.id } )
      var output = this.users.filter( function(u) {
        return ids.indexOf(u.id) < 0;
      });
      return output;
    };


    userService.create = function(card_member) {
      return Restangular.all('card_members').post( card_member )
    };


    return userService;

}])
djello.factory('userService', function() {

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


    return userService;

})
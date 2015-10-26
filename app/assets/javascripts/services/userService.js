djello.factory('userService', function() {

    var userService = {};
    userService.users = [];

    userService.setUsers = function(users) {
      this.users = users;
    };


    userService.excluding = function(excludedUsers) {
      return this.users.filter( function(u) {
        return excludedUsers.indexOf(u) < 0;
      });
    };


    return userService;

})
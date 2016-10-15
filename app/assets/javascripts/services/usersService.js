app.factory("usersService", ["Restangular", function(Restangular) {

  var usersService = {}

  var _users = []

  usersService.getAllUsers = function() {
    return Restangular.all("users").getList().then(function(response) {
      return angular.copy(response, _users)
    })
  }

  return usersService

}])
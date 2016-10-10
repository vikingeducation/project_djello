Djello.factory('UserService', [
  'Restangular', function(Restangular) {

    var getUsers = function() {
      return Restangular.all('users').getList();
    }

    return {
      getUsers: getUsers
    }

}])

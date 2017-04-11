djello.factory('userService',
  ['Restangular', 
  function(Restangular) {

    userService = {};

    userService.getAll = function(id) {
      return Restangular.all('users').getList();
    }

    return userService;

  }])
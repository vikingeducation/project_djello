// ----------------------------------------
// UserService
// ----------------------------------------

Djello.factory('UserService',
  ['_', 'Restangular',
  function(_, Restangular) {

  var UserService = {};

  UserService.all = function() {
    return Restangular.all('users').getList();
  }

  return UserService;

  }]);

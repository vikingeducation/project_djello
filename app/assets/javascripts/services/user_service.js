app.factory('UserService',
['Restangular', function (Restangular) {

  var UserService = {};
  var _usersCache = [];

  function _logError (reason) {
    console.log('ERROR!! Reason: ');
    console.log(reason);
  }

  function _storeUsers (response) {
    return angular.copy(response,_usersCache);
  }

  function _cacheUsers () {
    return Restangular.all('users')
      .getList()
      .then(_storeUsers)
      .catch(_logError);
  }

  UserService.all = function() {
    if (_.isEmpty(_usersCache)) {
      return _cacheUsers();
    } else {
      return Promise.resolve(_usersCache);
    }
  };

  return UserService;

}]);

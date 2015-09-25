djelloApp.factory('userService', ['Restangular',
                  function(Restangular){

  obj = {};
  var _users = {};

  obj.getUserListFromBackend = function(){
    _users = Restangular.all('users').getList().$object;
    console.log(_users);
  };

  obj.getUsers = function(){
    return _users;
  };

  return obj;

}]);
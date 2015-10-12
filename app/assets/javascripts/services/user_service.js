djello.factory('userService', ['Restangular', function(Restangular){
  var users = {};

  function getUsers() {
    Restangular.all('users').getList().then(function(data){
      users.data = data;
    }, function(error){
      alert('Cannot get users: ' + error);
    })
  }

  return {
    users: users,
    getUsers: getUsers
  }
}])
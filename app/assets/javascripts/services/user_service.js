djello.factory('userService', ['Restangular', function(Restangular){
  var users = {};

  function getUsers() {
    Restangular.all('users').getList().then(function(userList){
      users.userList = userList;
    }, function(error){
      alert('Cannot get users: ' + error);
    })
  }

  return {
    users: users,
    getUsers: getUsers
  }
}])
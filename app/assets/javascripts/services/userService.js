app.factory('Users', ['Restangular',  function(Restangular){
  var users = [];

  function getUsers(){
    if (users.length == 0){
      Restangular.all('users').getList().then(function(userList){
        if (users.length == 0) users.push.apply(users, userList);
      })
    }
  }

  return {
    users: users,
    getUsers: getUsers,
  }
}]);

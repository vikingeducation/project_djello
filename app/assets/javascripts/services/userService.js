app.factory("UserService", ['Auth', function(Auth){
  var loggedIn = {status: Auth.isAuthenticated()};
  var currentUser = {user: {}};

  function login(credentials, config){
    console.log(credentials, config)
    Auth.login(credentials, config).then(function(user) {
      console.log(user); // => {id: 1, ect: '...'}
      loggedIn.status = true;
      currentUser.user = user;
    }, function(error) {
      loggedIn.status = false;
    });
  }
  return {
    loggedIn: loggedIn,
    currentUser: currentUser,
    login: login,
  }
}]);

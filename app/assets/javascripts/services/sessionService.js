app.factory('Session', ['Auth', function(Auth){
  var loggedIn = {status: Auth.isAuthenticated()};
  var currentUser = {user: {}}

  function login(credentials, config){
    Auth.login(credentials, config).then(function(user) {
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
}])

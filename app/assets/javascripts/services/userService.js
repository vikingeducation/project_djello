app.factory("UserService", ['Auth', function(Auth){
  var loggedIn = {status: Auth.isAuthenticated()};
  var currentUser = {user: {}};

  console.log("inst UserService")

  Auth.currentUser().then(function(user) {
    currentUser.user = user;
    console.log("resolve user with " + user)
  })

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

  function logout(config) {
    console.log(config)
    Auth.logout(config).then(function(oldUser) {
      console.log(oldUser.name + "you're signed out now.");
      loggedIn.status = false;
      currentUser.user = {};
    }, function(error) {
      console.log('An error occurred logging out.');
      loggedIn.status = true;
    });

  }

  return {
    loggedIn: loggedIn,
    currentUser: currentUser,
    login: login,
    logout: logout,
  }
}]);

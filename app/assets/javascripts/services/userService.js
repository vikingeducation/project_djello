app.factory("UserService",  ['Auth', '$location', 'Restangular',
                            function(Auth, $location, Restangular){

  var loggedIn = {status: Auth.isAuthenticated()};
  var currentUser = {user: {}};

  var users = {};

  Restangular.all("users").getList().then(function(data){
    users.list = data;
    // for (var i = 0; i < users.list.length; i++) {
    //   users.list[i].userIndex = i;
    // };
  })

  console.log("inst UserService")

  Auth.currentUser().then(function(user) {
    currentUser.user = user;
    console.log("resolve user with (look below)")
    console.log(user)
  })

  function login(credentials, config){
    console.log(credentials, config)
    Auth.login(credentials, config).then(function(user) {
      console.log(user); // => {id: 1, ect: '...'}
      loggedIn.status = true;
      currentUser.user = user;
      console.log("redirecting to boards");
      $location.path('/boards')
    }, function(error) {
      loggedIn.status = false;
    });
  }

  function logout(config) {
    console.log(config)
    loggedIn.status = false;
    Auth.logout(config).then(function(oldUser) {
      console.log(oldUser.name + "you're signed out now.");
      currentUser.user = {};
    }, function(error) {
      console.log('An error occurred logging out.');
    });

  }

  return {
    users: users,
    loggedIn: loggedIn,
    currentUser: currentUser,
    login: login,
    logout: logout,
  }

}]);

app.factory('Session',  ['Auth', '$location', function(Auth,$location){
  var loggedIn = {status: Auth.isAuthenticated()};
  var currentUser = {user: {}}

  function login(credentials, config){
    Auth.login(credentials, config).then(function(user) {
      loggedIn.status = true;
      currentUser.user = user;
      $location.path("/loggedIn") 
    }, function(error) {
      loggedIn.status = false;
    });
  }

  function logout(){
   var config = {
          headers: {
              'X-HTTP-Method-Override': 'DELETE'
          }
      };
    Auth.logout(config).then(function(e){
      console.log("logged out");
      $location.path("/login");
    });
  }

  return {
    loggedIn: loggedIn,
    logout: logout,
    currentUser: currentUser,
    login: login,
  }
}])

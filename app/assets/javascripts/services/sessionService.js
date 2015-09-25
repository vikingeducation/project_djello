app.factory('Session',  ['Auth', '$location', function(Auth,$location){
  var loggedIn = {status: Auth.isAuthenticated()};
  var currentUser = {user: Auth.currentUser()}

  function relog(user){
    currentUser.user = user;

    loggedIn.status = Auth.isAuthenticated();
  }

  function login(credentials, config){
    Auth.login(credentials, config).then(function(user) {
      loggedIn.status = true;
      currentUser.user = user;
      $location.path("/board/index")
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
      loggedIn.status = Auth.isAuthenticated();
      $location.path("/login");
    }, function(er){
      console.log(er);
    });
  }

  return {
    loggedIn: loggedIn,
    logout: logout,
    currentUser: currentUser,
    login: login,
    relog: relog,
  }
}])

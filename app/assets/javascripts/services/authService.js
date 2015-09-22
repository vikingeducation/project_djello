djelloApp.factory('authService', ['$location', 'Auth',
                  function($location, Auth){

  var obj = {};
  var _currentUser = {};

  obj.signIn = function(user) {
    console.log("Sign in method called");

    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    Auth.login(user, config).then(function(user) {
        _currentUser = user;
        $location.path('/home');
        alert('Successfully signed in user!');
      }, function(error) {
        console.info('Error in authenticating user!');
        alert('Error in signing in user!');
      });
    };

    

  obj.signOut = function() {
    console.log('running');
    var config = {
      headers: {
          'X-HTTP-Method-Override': 'DELETE'
      }
    };

  // oldUser is not working
    Auth.logout(config).then(function(oldUser) {
      console.log(oldUser);
      $location.path('/users/sign_in');
      alert(oldUser + "you're signed out now.");
    }, function(error) {
      alert('An error occurred logging out.');
    });
  };

  obj.checkSignIn = function() {

      return Auth.isAuthenticated();

  };




  return obj;

}]);
djelloApp.factory('authService', ['$location', 'Auth',
                  function($location, Auth){

  var obj = {};
  var _currentUser = {};

  obj.signIn = function(user) {
    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    Auth.login(user, config).then(function(user) {
        _currentUser = user;
        $location.path('/boards/');
        alert('Successfully signed in user!');
      }, function(error) {
        console.info('Error in authenticating user!');
        alert('Error in signing in user!');
      });
    };

  obj.signOut = function() {
    var config = {
      headers: {
          'X-HTTP-Method-Override': 'DELETE'
      }
    };

    Auth.logout(config).then(function(oldUser) {
      $location.path('/users/sign_in');
      alert('Cheers ' + oldUser.username + ' you are signed out now.');
    }, function(error) {
      alert('An error occurred logging out.');
    });
  };

  obj.checkSignIn = function() {
    return Auth.isAuthenticated();
  };

  obj.setCurrentUser = function(currentUser){
    _currentUser = currentUser;
  };

  obj.getCurrentUser = function(){
    return _currentUser;
    // return Auth.currentUser();
  };

  return obj;

}]);
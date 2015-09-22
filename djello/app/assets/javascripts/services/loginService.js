djello.service('loginService', ['$location','Auth', function($location, Auth){

  var obj= {};
  obj.signedInUser = {};


  obj.logout = function(){
    var config = {
      headers: {
        'X-HTTP-Method-Override': 'DELETE'
      }
    };

    Auth.logout(config).then(function(oldUser) {
        // alert(oldUser.name + "you're signed out now.");
        console.log('successfully logged out');
        obj.signedInUser = {};
        $location.path('/');
      }, function(error) {
        // An error occurred logging out.
        console.log('could not log out');
      });

  };


  obj.loginUser = function(loginFormData){
    var config = {
    headers: {
        'X-HTTP-Method-Override': 'POST'
    }
  };
    console.log('inside signInUser function');
    Auth.login(loginFormData, config).then(function(user) {
        obj.signedInUser.user = user;
        console.log(user); // => {id: 1, ect: '...'}
    }, function(error) {
        console.log("Authentication failed...");
    });

  };

  return obj;
}]);
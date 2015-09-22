djello.service('loginService', ['$location','Auth', function($location, Auth){

  var obj= {};
  var config = {
    headers: {
        'X-HTTP-Method-Override': 'POST'
    }
  };

  var _user = {};

  obj.getUser = function(){
    console.log("user in service", _user);
    return _user;
  };

  obj.loginUser = function(loginFormData){
    console.log('inside signInUser function');
    Auth.login(loginFormData, config).then(function(user) {
        _user = user;
        console.log(user); // => {id: 1, ect: '...'}
    }, function(error) {
        console.log("Authentication failed...");
    });

  };

  return obj;
}]);
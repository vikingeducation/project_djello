djello.factory('userService', ['$http', 'Auth', function($http, Auth){
  var obj = {};

  obj.getCurrentUser = function(){
    $http.get("/current_user.json").then(function(response){
    return response.data;
  }, function(error){
    return error;
  });
  }

  // obj.getCurrentUser.then(function(response){
  //   obj.currentUser = response.data;
  // })

  obj.signOut = Auth.logout;

  obj.signIn = Auth.login

  return obj;
}])
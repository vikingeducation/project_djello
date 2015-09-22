djello.factory('userService', ['$http', 'Auth', function($http, Auth){
  var obj = {};

  obj.getCurrentUser = $http.get("/current_user.json");

  // obj.getCurrentUser.then(function(response){
  //   obj.currentUser = response.data;
  // })

  obj.signOut = Auth.logout;

  obj.signIn = Auth.login

  return obj;
}])
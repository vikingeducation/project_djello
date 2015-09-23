djello.factory('userService', ['$http', 'Auth', function($http, Auth){
  var obj = {};


  obj.signOut = Auth.logout;

  obj.signIn = Auth.login

  return obj;
}])
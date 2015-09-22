djello.factory('userService', ['$http', 'Auth', function($http, Auth){
  var obj = {}; 
  
  obj.getCurrentUser = $http.get("/current_user.json");

  return obj;
}])
app.controller("LoginCtrl", ["$scope", "Restangular", "$location", "UserService", function($scope, Restangular, $location, UserService){

  $scope.currentUser = UserService.currentUser;

  $scope.login = function(){
    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };
    UserService.login($scope.credentials, config)
  }
}])
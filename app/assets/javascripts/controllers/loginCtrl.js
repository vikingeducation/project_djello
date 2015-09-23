app.controller("LoginCtrl",
  ["$scope", "Restangular", "$location", "UserService", 'userPromise',
  function($scope, Restangular, $location, UserService, userPromise){
  console.log("Signed in as: ")
  console.log(userPromise)
  if (userPromise) {
    console.log("inside if - redirecting to boards from LoginCtrl")
    $location.path('/boards')
  };

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
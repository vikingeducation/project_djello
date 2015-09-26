djello.controller('signUp',['$scope', 'Auth', '$location',
  function($scope, Auth, $location){
  $scope.credentials = {};

  $scope.registerUser = function(){
    var config = {
      headers: {
          'X-HTTP-Method-Override': 'POST'
      }
    };
    console.log("Reistering User!")
    Auth.register($scope.credentials, config).then(function(registeredUser) {
      console.log(registeredUser);
      $location.path('/boards');
    }, function(error) {
      // Registration failed...
    });
  }

  $scope.$on('devise:new-registration', function(event, user) {
    $scope.currentUser = registeredUser;
            // ...
  });

  // Auth.currentUser()
  // console.log(Auth.isAuthenticated());

}])
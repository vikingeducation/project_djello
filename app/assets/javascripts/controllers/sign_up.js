djello.controller('signUp',['$scope', 'Auth', '$state',
  function($scope, Auth, $state){
  $scope.credentials = {};
  var config = {
    headers: {
        'X-HTTP-Method-Override': 'POST'
    }
  };

  $scope.registerUser = function(){
    console.log("Reistering User!")
    Auth.register($scope.credentials, config).then(function(registeredUser) {
      console.log(registeredUser);
      $state.go('index');
    }, function(error) {
      // Registration failed...
    });
  }

  Auth.currentUser()
  console.log(Auth.isAuthenticated());

}])
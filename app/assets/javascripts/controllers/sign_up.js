djello.controller('signUp', ['$scope', 'Auth', '$state', 'sessionService',
  function($scope, Auth, $state, sessionService){
  $scope.credentials = {};
  $scope.currentUser = sessionService.currentUser;
  $scope.authenticated = sessionService.authenticated;

  $scope.registerUser = function(){
    var config = {
      headers: {
          'X-HTTP-Method-Override': 'POST'
      }
    };
    console.log("Reistering User!")
    Auth.register($scope.credentials, config).then(function(registeredUser) {
      console.log(registeredUser);
      $state.go('home.boards');
    }, function(error) {
      // Registration failed...
    });
  }

  $scope.$on('devise:new-registration', function(event, registeredUser) {
    $scope.currentUser.user = registeredUser;
    $scope.authenticated.status = true;
            // ...
  });

  // Auth.currentUser()
  // console.log(Auth.isAuthenticated());

}])
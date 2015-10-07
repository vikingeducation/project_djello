djello.controller('signUp', ['$scope', 'Auth', '$state', 'sessionService',
  function($scope, Auth, $state, sessionService){
  $scope.credentials = {};
  $scope.currentUser = sessionService.currentUser;
  $scope.authenticated = sessionService.authenticated;

  function registerUser(){
    var config = {
      headers: {
          'X-HTTP-Method-Override': 'POST'
      }
    };
    console.log("Reistering User!")
    Auth.register($scope.credentials, config).then(function(registeredUser) {
      // console.log(registeredUser);
      $state.go('home.boards');
    }, function(error) {
      alert('Sorry, cannot register new user!');
    });
  }

  $scope.processForm = function(isValidForm) {
    if (isValidForm) {
      registerUser();
    } else {
      alert("Please fill in all the required information!");
    }
  }

  $scope.$on('devise:new-registration', function(event, registeredUser) {
    $scope.currentUser.user = registeredUser;
    $scope.authenticated.status = true;
            // ...
  });

  // Auth.currentUser()
  // console.log(Auth.isAuthenticated());

}])
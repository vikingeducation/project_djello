djello.controller('signUp',['$scope', 'Auth', function($scope, Auth){
  $scope.credentials = {};
  var config = {
    headers: {
        'X-HTTP-Method-Override': 'POST'
    }
  };

  $scope.registerUser = function(){
    console.log("Reistering User!")
    Auth.register($scope.credentials, config).then(function(registeredUser) {
      console.log(registeredUser); // => {id: 1, ect: '...'}
    }, function(error) {
      // Registration failed...
    });
  }

  $scope.$on('devise:new-registration', function(event, user) {
    // ...
  });
}])
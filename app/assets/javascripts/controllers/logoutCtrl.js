app.controller('LogoutCtrl', ['UserService', '$scope', '$location',
                          function(UserService, $scope, $location) {

  var config = {
    headers: {
        'X-HTTP-Method-Override': 'DELETE'
    }
  };

  UserService.logout(config);

  $scope.$on('devise:logout', function(event, oldCurrentUser) {
    $location.path('/')
  });

}]);
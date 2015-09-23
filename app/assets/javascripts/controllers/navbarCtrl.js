app.controller('NavbarCtrl', ['UserService', '$scope', '$location',
                              function(UserService, $scope, $location) {

  $scope.loggedIn = UserService.loggedIn;
  $scope.currentUser = UserService.currentUser;

  $scope.$on('devise:login', function(event) {
    $location.path('/boards')
  });

  $scope.$on('devise:logout', function(event, oldCurrentUser) {
    $location.path('/login')
  });

}]);
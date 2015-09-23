app.controller('NavbarCtrl', ['UserService', '$scope', '$location',
                              function(UserService, $scope, $location) {

  console.log("inst NavbarCtrl")

  $scope.loggedIn = UserService.loggedIn;
  $scope.currentUser = UserService.currentUser;

  console.log($scope.loggedIn.status)

  $scope.$on('devise:login', function(event) {
    $location.path('/boards')
  });

  $scope.$on('devise:logout', function(event, oldCurrentUser) {
    $location.path('/login')
  });

}]);
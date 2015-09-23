djello.controller('navbarCtrl', ['$scope', '$state', 'userService', '$location', 'Auth',
  function($scope, $state, userService, $location, Auth) {

    console.log("setting up navbarCtrl")


    $scope.signOut = function(){
      var config = {
          headers: {
              'X-HTTP-Method-Override': 'DELETE'
          }
      };
      console.log("signing out!")
      userService.signOut(config);

    }

    $scope.signIn = function(credentials){
      var config = {
          headers: {
              'X-HTTP-Method-Override': 'POST'
          }
      };
      console.log("signing in")
      userService.signIn(credentials, config)

    }

    $scope.$on('devise:logout', function(event, oldCurrentUser) {
      console.log("signed OUT!!!!")
      $scope.currentUser = null
    });
    $scope.$on('devise:login', function(event, currentUser) {
      console.log("propagation", currentUser)
      $scope.currentUser = currentUser
      $location.path('/boards')
    });


}])
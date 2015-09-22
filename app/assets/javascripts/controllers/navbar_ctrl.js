djello.controller('navbarCtrl', ['$scope', '$state', 'userService', '$location',
  function($scope, $state, userService, $location) {

    console.log("setting up navbarCtrl")

    var getCurrentUser = function(){
      userService.getCurrentUser.then(function(response){
        console.log(response.data);
        $scope.currentUser = response.data;
      })
    }

    getCurrentUser();

    $scope.signOut = function(){
      var config = {
          headers: {
              'X-HTTP-Method-Override': 'DELETE'
          }
      };
      console.log("signing out!")
      userService.signOut(config);
      getCurrentUser();

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
      $location.path('/board')
    });


}])
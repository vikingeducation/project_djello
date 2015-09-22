djello.controller('navbarCtrl', ['$scope', '$state', 'userService', '$location',
  function($scope, $state, userService, $location) {

    console.log("setting up navbarCtrl")

    userService.getCurrentUser.then(function(response){
        console.log(response.data);
        $scope.currentUser = response.data;
    })

    $scope.signOut = function(){
      var config = {
          headers: {
              'X-HTTP-Method-Override': 'DELETE'
          }
      };
      userService.signOut(config);
      console.log("signing out!")

    }

    $scope.signIn = function(credentials){
      var config = {
          headers: {
              'X-HTTP-Method-Override': 'POST'
          }
      };
      userService.signIn(credentials, config)
      console.log("signing in")

    }

    $scope.$on('devise:logout', function(event, oldCurrentUser) {
      console.log("signed OUT!!!!")
      $scope.currentUser = null
    });
    $scope.$on('devise:login', function(event, currentUser) {
      console.log("signed IN!!!!")
      $location.path('/board')
    });


}])
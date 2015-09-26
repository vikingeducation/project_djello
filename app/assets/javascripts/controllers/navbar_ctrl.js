djello.controller('navbarCtrl', ['$scope', 'sessionService',
  function($scope, sessionService) {
    console.log("setting up navbarCtrl")

    $scope.currentUser = sessionService.currentUser;
    $scope.authenticated = sessionService.authenticated;

    $scope.signIn = function(credentials){
      console.log("sign in:", credentials);
      sessionService.signIn(credentials);                                               
    }

    $scope.signOut = function(){
      sessionService.signOut();
    }

    // $scope.$on('devise:logout', function(event, oldCurrentUser) {

    //   $scope.currentUser = null;
    //   $location.path('/');
    // });
    // $scope.$on('devise:login', function(event, currentUser) {
    //   console.log("propagation", currentUser);
    //   $scope.currentUser = currentUser;
    //   $location.path('/boards');
    // });


}])
djello.controller('navbarCtrl', ['$scope', 'sessionService', '$state',
  function($scope, sessionService, $state) {
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

    $scope.$on('devise:login', function(event, currentUser) {
      $scope.currentUser.user = currentUser;
      $scope.authenticated.status = true;
      $state.go('home.boards');
    });

    $scope.$on('devise:logout', function(event, oldCurrentUser) {
      $scope.currentUser.user = null;
      $scope.authenticated.status = false;
      $state.go('home');
    });

    $scope.$on('devise:unauthorized', function() {
      $state.go('home');
    })
}])
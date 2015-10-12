djello.controller('navbarCtrl', ['$scope', 'sessionService', '$state',
  function($scope, sessionService, $state) {
    console.log("setting up navbarCtrl")
    $scope.currentUser = sessionService.currentUser;
    $scope.authenticated = sessionService.authenticated;
    $scope.credentials = {};

    function signIn(){
      console.log("sign in:", $scope.credentials);
      sessionService.signIn($scope.credentials);                                               
    }

    $scope.processForm = function(isValidForm) {
    if (isValidForm) {
      signIn();
    } else {
      alert("Please fill in your sign in information!");
    }
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
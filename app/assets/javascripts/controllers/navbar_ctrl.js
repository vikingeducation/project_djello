djello.controller('navbarCtrl', ['$scope', 'sessionService', '$state',
  function($scope, sessionService, $state) {
    console.log("setting up navbarCtrl")
    $scope.currentUser = sessionService.currentUser;
    // if (!$scope.currentUser.user || !$scope.currentUser.user.length) {
    //   Auth.currentUser().then(function(user){
    //     $scope.currentUser.user = currentUser;
    //   }, function(error){
    //     $state.go('');
    //   })
    // }

    $scope.authenticated = sessionService.authenticated;

    $scope.signIn = function(credentials){
      console.log("sign in:", credentials);
      sessionService.signIn(credentials);                                               
    }

    $scope.signOut = function(){
      sessionService.signOut();
    }

    $scope.$on('devise:login', function(event, currentUser) {
      // console.log("propagation", currentUser);
      $scope.currentUser.user = currentUser;
      // $state.path('/boards');
      $state.go('home.boards');
    });

    $scope.$on('devise:logout', function(event, oldCurrentUser) {
      $scope.currentUser.user = null;
      $state.go('home');
    });

    $scope.$on('devise:unauthorized', function() {
      $state.go('home');
    })

}])
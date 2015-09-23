djelloApp.controller('navbarCtrl',
  ['$scope', 'authService', '$location',
  function($scope, authService, $location){

    $scope.user = authService.getCurrentUser().$$state.value;
    user1 = authService.getCurrentUser;

    $scope.signOut = function(){
      authService.signOut();
    };

    // Redirect on logout
    $scope.$on('devise:logout', function(event, oldCurrentUser) {
      $location.path('/users/sign_in');
    });

}]);
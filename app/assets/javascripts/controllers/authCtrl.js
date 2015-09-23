djelloApp.controller('authCtrl',
  ['$scope', 'authService', '$location',
  function($scope, authService, $location){

    $scope.user = {};

    $scope.signIn  = function(){authService.signIn($scope.user);};

    $scope.$on('devise:login', function(event, currentUser) {
      // after a login, a hard refresh, a new tab
      // $scope.user = currentUser;
      $location.path('/boards/');
    });

}]);


// authService.setCurrentUser(currentUser);
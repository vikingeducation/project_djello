djelloApp.controller( 'boardCtrl',
  ['$scope', 'authService', '$location',
  function($scope, authService, $location){

    $scope.signOut = function(){authService.signOut();};

    var checkSignIn = authService.checkSignIn();
    if (!checkSignIn) { $location.path('/users/sign_in'); }

  }]);

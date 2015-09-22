djelloApp.controller( 'authenticationCtrl',
  ['$scope', 'authService', '$location',
  function($scope, authService, $location){

    $scope.user = {};


    $scope.signIn  = function(){authService.signIn($scope.user);};
    $scope.signOut = function(){authService.signOut();};
   
    var checkSignIn = authService.checkSignIn();
    if (!checkSignIn) { $location.path('/users/sign_in'); }

  }]);

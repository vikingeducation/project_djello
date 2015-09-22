djelloApp.controller( 'authCtrl',
  ['$scope', 'authService',
  function($scope, authService){

    $scope.user = {};

    $scope.signIn  = function(){authService.signIn($scope.user);};

  }]);

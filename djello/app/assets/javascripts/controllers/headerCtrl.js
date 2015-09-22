djello.controller('headerCtrl', ['$scope', '$location','Auth', 'loginService', function($scope, $location, Auth, loginService){

  console.log('headerCtrl initiated');


  $scope.loginFormData = {};
  $scope.user = loginService.signedInUser.user;

  $scope.logout = function(){
    loginService.logout();
  }

  $scope.signInUser = function(){
    loginService.loginUser($scope.loginFormData);

    $scope.$on('devise:login', function(event, currentUser) {
        // after a login, a hard refresh, a new tab
        $scope.user = currentUser;
        console.log('in headerCtrl', $scope.user);
        $location.path('/board');
    });

    $scope.$on('devise:new-session', function(event, currentUser) {
        // user logged in by Auth.login({...})
        $location.path('/board');
    });

    // console.log("in ctrl", $scope.user );
  };

}]);

djello.controller('headerCtrl', ['$scope', '$location','Auth', function($scope, $location, Auth){

  console.log('headerCtrl initiated');
  $scope.username = 'USER';

  $scope.loginFormData = {};

  var config = {
      headers: {
          'X-HTTP-Method-Override': 'POST'
      }
  };

  $scope.signInUser = function(){
    console.log('inside signInUser function');
    Auth.login($scope.loginFormData, config).then(function(user) {
        console.log(user); // => {id: 1, ect: '...'}
    }, function(error) {
        console.log("Authentication failed...");
    });

    $scope.$on('devise:login', function(event, currentUser) {
        // after a login, a hard refresh, a new tab
        $location.path('/board');
    });

    $scope.$on('devise:new-session', function(event, currentUser) {
        // user logged in by Auth.login({...})
        $location.path('/board');
    });
  };

}]);

app.controller('SessionCtrl', ['$scope', 'Session', function($scope, Session){
  $scope.loggedIn = Session.loggedIn;
  $scope.currentUser = Session.currentUser;

  $scope.credentials = { username: "", password: ""};
  // if ($scope.loggedIn) {
  //   $location.path()
  // }

  $scope.login = function(){
    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

    Session.login($scope.credentials, config);
  };

  $scope.logout = function(){
    Session.logout();
  };

}])

app.controller('SessionCtrl', ['$scope', 'Auth', 'Session', function($scope, Auth, Session){
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
  }

}])

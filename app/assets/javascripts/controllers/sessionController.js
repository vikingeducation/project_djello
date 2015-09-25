app.controller('SessionCtrl', ['$scope', '$location', 'Session', function($scope, $location, Session){
  $scope.loggedIn = Session.loggedIn;

  $scope.$on('devise:login', function(event, currentUser) {
    console.log("relogging", currentUser);
    Session.relog(currentUser);
    $location.path('/board/index');
  });

  $scope.currentUser = Session.currentUser;

  console.log("boolean");
  if ($scope.loggedIn.status) {
    $location.path('/board/index');
  }


  $scope.credentials = { username: "", password: ""};

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

  $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
    $location.path('/login');
  })
}])

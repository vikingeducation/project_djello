app.controller('SessionCtrl', ['$scope', '$location', 'Session', function($scope, $location, Session){
  $scope.loggedIn = Session.loggedIn;

  if ($scope.loggedIn.status) {
    $location.path('/board')
  }

  $scope.currentUser = Session.currentUser;

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

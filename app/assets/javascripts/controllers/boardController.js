app.controller('BoardCtrl', ['$scope', '$location', 'Restangular', 'Session', 'Boards', function($scope, $location, Restangular, Session, Boards){
  // $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
  //   $location.path('/login');
  // }
  $scope.loggedIn = Session.loggedIn;

  if (!$scope.loggedIn.status) {
    $location.path('/login')
  }

  $scope.currentUser = Session.currentUser;

  $scope.boards = Boards.boards;


  $scope.logout = function(){
    Session.logout();
  };

  if ($scope.boards.length == 0) Boards.getBoards();
}])

app.controller('BoardCtrl', ['$scope', 'Restangular', 'Session', 'Boards' function($scope, Restangular, Session, Boards){
  $scope.loggedIn = Session.loggedIn;
  $scope.currentUser = Session.currentUser;

}])

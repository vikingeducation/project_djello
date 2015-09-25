app.controller('BoardIndexCtrl',['$scope', '$location', 'Restangular', 'Boards', function($scope, $location, Restangular, Boards){
  $scope.boards = Boards.boards;
}]);

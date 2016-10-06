app.controller('BoardsIndexCtrl',
['$scope', 'boards', function($scope, boards) {

  $scope.boards = boards;

  $scope.$on('board.create', function(response) {
    console.log(response);
  });

}]);

djello.controller('BoardsShowCtrl',
  [ '$scope', 'Restangular',
  function($scope, Restangular) {

    $scope.board = {
      id: 5,
      title: 'Board Title'
    };

}]);
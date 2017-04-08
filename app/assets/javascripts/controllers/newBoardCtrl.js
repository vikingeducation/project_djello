djello.controller('newBoardsCtrl',
  ['$scope', 'boards',
  function($scope, boards) {

    $scope.boards = boards;

  }])
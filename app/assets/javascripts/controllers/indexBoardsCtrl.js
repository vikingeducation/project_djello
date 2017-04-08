djello.controller('indexBoardsCtrl',
  ['$scope', 'boards',
  function($scope, boards) {

    $scope.boards = boards;

  }])
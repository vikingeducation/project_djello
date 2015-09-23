djelloApp.controller('boardShowCtrl',
  ['$scope', 'Restangular', 'board',
  function($scope, Restangular, board ){
    // board;
    $scope.board = board;


  }]);
app.controller("BoardCtrl", ['$scope', 'boardService', '$stateParams', function($scope, boardService, $stateParams){


  $scope.board = boardService.getBoard($stateParams.id).$object;
  


}]);
Djello.controller('CardModalCtrl', ['$scope', 'close', 'cardParams', function($scope, close, cardParams) {

  $scope.card = cardParams;
  $scope.cardParams = cardParams;
  // $scope.cardParams.title = cardParams.title;
  // $scope.cardParams.desc = cardParams.desc;

  // when you need to close the modal, call close
  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.destroy = function(result) {
    result.delete = true;
      close(result, 500);
  };

}]);
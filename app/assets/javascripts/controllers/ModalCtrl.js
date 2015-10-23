djello.controller('ModalController',
  ['$scope', 'card', 'close',
  function($scope, card, close) {

  $scope.card = card;

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };

}]);
djello.controller('ModalCtrl',
  ['$scope', '$window', 'card', 'close', 'cardService',
  function($scope, $window, card, close, cardService) {

    $scope.card = card;

    $scope.close = function(result) {
      if (result === 'Completed' &&
        $window.confirm('Mark this card as completed and remove from list?')) {
        cardService.markCompleted($scope.card);
      };

      close(result, 500);
    };

}]);
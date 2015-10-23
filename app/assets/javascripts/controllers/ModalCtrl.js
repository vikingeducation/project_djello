djello.controller('ModalController',
  ['$scope', '$window', 'card', 'close', 'cardService',
  function($scope, $window, card, close, cardService) {

  $scope.card = card;

  $scope.close = function(result) {
    if (result === 'Completed' &&
      $window.confirm("Mark this card completed and remove it from the list?")) {
        cardService.markCompleted($scope.card);
    };

    close(result, 500);
  };

}]);
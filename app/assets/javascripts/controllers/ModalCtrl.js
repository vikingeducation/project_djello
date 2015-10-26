djello.controller('ModalController',
  ['$scope', '$window', 'card', 'close', 'cardService', 'userService',
  function($scope, $window, card, close, cardService, userService) {

  $scope.card = card;
  $scope.members = card.members;
  console.log($scope.members);
  // need id's to exclude
  $scope.users = userService.excluding($scope.members);

  $scope.close = function(result) {
    if (result === 'Completed' &&
      $window.confirm("Mark this card completed and remove it from the list?")) {
        cardService.markCompleted($scope.card);
    };

    close(result, 500);
  };

}]);
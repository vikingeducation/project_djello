djello.controller('ModalController',
  ['$scope', '$window', 'card', 'close', 'cardService', 'userService',
  function($scope, $window, card, close, cardService, userService) {

  $scope.card = card;
  $scope.members = card.members;
  $scope.users = userService.excluding($scope.members);


  $scope.addMember = function() {
    $scope.newMember['card_id'] = $scope.card.id
    userService.create($scope.newMember)
      .then( function(response) {
        console.log('ajax!')
      })
    $scope.newMember = {};
  };


  $scope.close = function(result) {
    if (result === 'Completed' &&
      $window.confirm("Mark this card completed and remove it from the list?")) {
        cardService.markCompleted($scope.card);
    };

    close(result, 500);
  };

}]);

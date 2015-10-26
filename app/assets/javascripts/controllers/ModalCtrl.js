djello.controller('ModalController',
  ['$scope', '$window', 'card', 'close', 'cardService', 'userService', 'boardService',
  function($scope, $window, card, close, cardService, userService, boardService) {

  $scope.card = card;
  $scope.card_members = card.card_members || [];
  $scope.users = userService.excluding($scope.card_members);


  $scope.addMember = function() {
    $scope.newMember['card_id'] = $scope.card.id
    userService.create($scope.newMember)
      .then( function(response) {
        boardService.addMember(response)
        $scope.card_members.push(response);
        $scope.users = userService.excluding($scope.card_members);
      })
    $scope.newMember = {};
  };


  $scope.removeMember = function(card_member) {
    userService.removeMember(card_member)
      .then( function() {
        console.log('removed');
      });
  }


  $scope.close = function(result) {
    if (result === 'Completed' &&
      $window.confirm("Mark this card completed and remove it from the list?")) {
        cardService.markCompleted($scope.card);
    };

    close(result, 500);
  };

}]);

djello.controller('ModalController',
  ['$scope', '$window', 'card', 'close', 'cardService', 'userService', 'boardService',
  function($scope, $window, card, close, cardService, userService, boardService) {

  $scope.card = card;
  $scope.members = card.members || [];
  $scope.users = userService.excluding($scope.members);


  $scope.addMember = function() {
    $scope.newMember['card_id'] = $scope.card.id
    userService.create($scope.newMember)
      .then( function(response) {
        boardService.addMember(response)
        $scope.members.push(response.member);
        $scope.users = userService.excluding($scope.members);
      })
    $scope.newMember = {};
  };


  $scope.removeMember = function(card, member) {
    userService.remove(card, member)
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

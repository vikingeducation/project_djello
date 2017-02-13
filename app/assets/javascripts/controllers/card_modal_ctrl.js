Djello.controller('CardModalCtrl', ['$scope', 'close', 'cardParams', 'CardService', 'users',
  function($scope, close, cardParams, CardService, users) {

  $scope.card = cardParams;
  $scope.cardParams = cardParams;
  $scope.users = CardService.filterMembers($scope.card, users);

  // when you need to close the modal, call close
  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.destroy = function(result) {
    result.delete = true;
      close(result, 500);
  };

  $scope.deleteMember = function(card, member) {
    CardService.destroyMember(card, member).then( function(member) {
      new_members = _.reject($scope.card.card_members, function(m) { return m.id === member.id});
      angular.copy(new_members, $scope.card.card_members);
      $scope.users.push(member);
    })
  }

  $scope.addMember = function(card, member) {
    CardService.addMember(card, member).then( function(member) {
      $scope.card.card_members.push(member);
      new_users = _.reject($scope.users, function(user) { return user.id === member.id });
      angular.copy(new_users, $scope.users);
    })
  }

}]);
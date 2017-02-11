Djello.controller('CardModalCtrl', ['$scope', 'close', 'cardParams', 'CardService',
  function($scope, close, cardParams, CardService) {

  $scope.card = cardParams;
  $scope.cardParams = cardParams;

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
      console.log(member[0].user_id);
      new_members = _.reject($scope.card.card_members, function(m) { return m.id === member[0].user_id});
      angular.copy(new_members, $scope.card.card_members);
    })
  }

}]);
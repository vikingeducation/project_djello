djello.controller('ModalCtrl',
  ['$scope', '$window', '$timeout', 'card', 'close', 'cardService', 'flashService', 'userService', 'boardService',
  function($scope, $window, $timeout, card, close, cardService, flashService, userService, boardService) {

    $scope.card = card;
    $scope.card_members = card.card_members || [];
    $scope.users = userService.excluding($scope.card_members);
    $scope.flash = '';

    $scope.initCardActivities = function() {
      cardService.getCardActivities(card)
        .then(function(response) {
          $scope.card_activities = response.card_activities;
        });
    };

    $scope.close = function(result) {
      if (result === 'Completed' &&
        $window.confirm('Mark this card as completed and remove from list?')) {
        cardService.markCompleted($scope.card);
      };

      close(result, 500);
    };

    $scope.addMember = function() {
      $scope.newMember['card_id'] = $scope.card.id;
      userService.create($scope.newMember)
        .then( function(response) {
          boardService.addMember(response);
          $scope.card_activities = response.card.card_activities;
          $scope.users = userService.excluding($scope.card_members);
          $scope.setFlash('Member', 'add', true);
        }, $scope.setFlash('Member', 'add', false) );
        $scope.newMember = {};
    };

    $scope.removeMember = function(card_member) {
      userService.remove(card_member)
        .then( function(response) {
          boardService.removeMember(response);
          $scope.card_activities = response.card.card_activities;
          $scope.dropScopeMember(response.id);
          $scope.setFlash('Member', 'remove', true);
        }, $scope.setFlash('Member', 'remove', false) );
    };

    $scope.dropScopeMember = function(id) {
      $scope.card_members = $scope.card_members.filter( function(member) {
        return (member.id !== Number(id))
      });
      $scope.users = userService.excluding($scope.card_members);
    };

    $scope.setFlash = function(obj, actionType, bool) {
      $scope.flash = flashService.updateFlash(obj, actionType, bool);
      $timeout(function() {
        $scope.flash = '';
      }, 3500, true);
    };

    $scope.showFlash = function() {
      return !!($scope.flash);
    };

    $scope.initCardActivities();

}]);
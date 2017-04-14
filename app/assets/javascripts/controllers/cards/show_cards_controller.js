djello.controller('showCardsController', 
  ['$scope', 'close', 'card', 'cardService', 'userService', '$rootScope', 'membershipService',
  function($scope, close, card, cardService, userService, $rootScope, membershipService) {

    $scope.card = card;

    $scope.members = membershipService.getMembers($scope.card).$object;

    $scope.addMember = function() {
      console.log('adding member')
      membershipService.createMembership($scope.card, $scope.selectedUser).then( function(response) {
        $scope.members = membershipService.getMembers($scope.card).$object;
        $scope.selectedUser = {};
      })
    }

    $scope.removeMember = function(user_id) {
      membershipService.removeMember(user_id, $scope.card)
                       .then( function() {
                          $scope.members = membershipService.getMembers($scope.card).$object;
                       })
    }

    $scope.close = function(result) {
      close(result, 500);
    };

    $scope.updateCard = function() {
      console.log('updating', $scope.card.description )
      cardService.updateCard($scope.card)
                 .then( function(response) {
                    console.log('finished update', response);
                    $scope.editMode = false;
                 })
    };

    $scope.markComplete = function() {
      cardService.markComplete($scope.card)
                 .then( function(response) {
                  $rootScope.$broadcast('card.completed');
                  $scope.close();
                 });
    };

    $scope.users = userService.getAll().$object;
 
  }])
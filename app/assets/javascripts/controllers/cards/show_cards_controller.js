djello.controller('showCardsController', 
  ['$scope', 'close', 'card', 'cardService', 'userService', '$rootScope', 'membershipService', 'activityService',
  function($scope, close, card, cardService, userService, $rootScope, membershipService, activityService) {

    $scope.card = card;

    $scope.members = membershipService.getMembers($scope.card).$object;

    $scope.activities = activityService.getActivities($scope.card.id).$object;

    $scope.addActivity = function(description) {
      activityService.createActivity($scope.card.id, description);
    }

    $scope.addMember = function() {
      console.log('adding member')
      membershipService.createMembership($scope.card, $scope.selectedUser).then( function(response) {
        $scope.addActivity('added user' + $scope.selectedUser.username);
        $scope.members = membershipService.getMembers($scope.card).$object;
        $scope.selectedUser = {};
      })
    }

    $scope.removeMember = function(user_id) {
      membershipService.removeMember(user_id, $scope.card)
                       .then( function() {
                          // card remove member activity
                          $scope.members = membershipService.getMembers($scope.card).$object;
                       })
    }

    $scope.close = function(result) {
      close(result, 500);
    };

    $scope.updateCard = function() {
      cardService.updateCard($scope.card)
                 .then( function(response) {
                    // card updated activity
                    console.log('finished update', response);
                    $scope.editMode = false;
                 })
    };

    $scope.markComplete = function() {
      cardService.markComplete($scope.card)
                 .then( function(response) {
                  // card completed activity
                  $rootScope.$broadcast('card.completed');
                  $scope.close();
                 });
    };

    $scope.users = userService.getAll().$object;
 
  }])
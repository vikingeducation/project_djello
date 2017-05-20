djello.controller('newCardsCtrl', 
  ["$scope", "cardService", 'cardMembershipService', 'activityService',
  function($scope, cardService, cardMembershipService, activityService) {

    $scope.createCard = function() {
      $scope.newCard.list_id = $scope.list.id;
      cardService.createCard($scope.newCard) 
                  .then( function(response) {
                    activityService.createActivity(response.id, 'created card');
                    cardMembershipService.createMembership(response);
                    $scope.newCard = {};
                    $scope.$emit($scope.list.id + ".newCard", response);
                  } )
    }

  }])
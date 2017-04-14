djello.controller('newCardsCtrl', 
  ["$scope", "cardService", 'membershipService', 'activityService',
  function($scope, cardService, membershipService, activityService) {

    $scope.createCard = function() {
      $scope.newCard.list_id = $scope.list.id;
      cardService.createCard($scope.newCard) 
                  .then( function(response) {
                    activityService.createActivity(response.id, 'created card');
                    $scope.newCard = {};
                    membershipService.createMembership(response);
                    $scope.$emit($scope.list.id + ".newCard", response);
                  } )
    }

  }])
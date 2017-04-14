djello.controller('newCardsCtrl', 
  ["$scope", "cardService", 'membershipService', 'activityService',
  function($scope, cardService, activityService) {

    $scope.createCard = function() {
      $scope.newCard.list_id = $scope.list.id;
      cardService.createCard($scope.newCard) 
                  .then( function(response) {
                    // card created activity
                    $scope.newCard = {};
                    membershipService.createMembership(response);
                    $scope.$emit($scope.list.id + ".newCard", response);
                  } )
    }

  }])
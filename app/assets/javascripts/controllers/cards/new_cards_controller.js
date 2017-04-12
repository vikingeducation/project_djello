djello.controller('newCardsCtrl', 
  ["$scope", "cardService", 'membershipService',
  function($scope, cardService) {

    $scope.createCard = function() {
      $scope.newCard.list_id = $scope.list.id;
      cardService.createCard($scope.newCard) 
                  .then( function(response) {
                    $scope.newCard = {};
                    membershipService.createMembership(response);
                    $scope.$emit($scope.list.id + ".newCard", response);
                  } )
    }

  }])
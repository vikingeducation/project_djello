djello.controller('showCardsController', 
  ['$scope', 'close', 'card', 'cardService',
  function($scope, close, card, cardService) {

    $scope.card = card;

    $scope.close = function(result) {
      close(result, 500);
    };

    $scope.editMode = false;

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
                  console.log('complete', response);
                  $scope.close();
                 });
    }
 
  }])
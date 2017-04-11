djello.controller('showCardsController', 
  ['$scope', 'close', 'card', 'cardService', 'userService',
  function($scope, close, card, cardService, userService) {

    $scope.card = card;

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
                  console.log('complete', response);
                  $scope.close();
                 });
    };

    $scope.users = userService.getAll().$object;
 
  }])
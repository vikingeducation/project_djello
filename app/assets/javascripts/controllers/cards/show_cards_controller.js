djello.controller('showCardsController',
  ['$scope', 'close', 'card',
  function($scope, close, card) {

    $scope.card = card;

    $scope.close = function(result) {
      close(result, 500);
    }

  }])
app.controller("CardsCtrl", ["$scope", "close", "card", function($scope, close, card){

  $scope.card = card;

  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
 };

}])
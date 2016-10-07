djello.controller('CardCtrl', ['$scope', 'close', 'card', function($scope, close, card) {

 $scope.card = card;
 console.log($scope.card);
  
 $scope.close = function(result) {
    close(result, 500);
 };

}]);
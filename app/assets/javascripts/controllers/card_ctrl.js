app.controller("CardCtrl", ['$scope', 'close', 'card', function($scope, close, card){

  $scope.card = card;

  $scope.closeCard = function(result){
    close(result, 300);
  };
  

}]);
djello.controller('CardCtrl', ['$scope', 'close', 'card', '$timeout', function($scope, close, card, $timeout) {

 $scope.card = card;
  
 $scope.close = function(result) {
    close(result, 500);
 };

 $scope.toggleTitleEditing = function() {
    $scope.titleEditing = !$scope.titleEditing;
 };

 $scope.updateCardTitle = function(){
    $scope.titleEditing = false;
    $scope.card.patch()
  };

  $scope.editCardTitle = function(){
    console.log("editing title...")
    $scope.toggleTitleEditing();
    $timeout(function(){
      $('#cardTitleEdit').focus();
    }, 200);
  };

  $scope.editCardDesc = function(card) {
    card.descEditing = true;
    $timeout(function(){
      $('[card-desc-id="'+ card.id + '"]').focus();
    }, 200);
  };

  $scope.updateCardDesc = function(card) {
    card.descEditing = false;
    card.patch();
  }

}]);
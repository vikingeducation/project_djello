djello.controller('CardCtrl', ['$scope', 'close', 'card', 'list', '$timeout', function($scope, close, card, list, $timeout) {

 $scope.card = card;
 $scope.list = list;

  
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

  $scope.deleteCard = function(){
    var index = _.indexOf($scope.list.cards, $scope.card)
    $scope.list.cards.splice(index, 1);
    $scope.card.remove()
  }

}]);
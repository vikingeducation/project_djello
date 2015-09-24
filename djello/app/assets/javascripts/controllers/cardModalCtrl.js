
djello.controller('cardModalCtrl', [
  '$scope', '$element', 'card', 'close',
  function($scope, $element, card, close) {

  // $scope.name = null;
  // $scope.age = null;
  // console.log("Modal ctrl has card", card)
  $scope.card = card;

  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
    console.log('close method ran');
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    console.log('cancel method ran');
    //  Now call close, returning control to the caller.
    close({}, 500); // close, but give 500ms for bootstrap to animate
  };

  //=================card editing methods==================

  $scope.oldCard = { id: card.id,
                  title: card.title,
                  description: card.description};

  $scope.editCard = function(input){
    if (input == 'cancel' && $scope.editCardEnabled) {
      $scope.oldCard =  $scope.card;
    }
    else if (input == 'saved' && $scope.editCardEnabled){
      var updatedCard = Restangular.one('lists', card.list_id).one('cards', card.id);
      updatedCard.title = $scope.oldCard.title;
      updatedCard.description = $scope.oldCard.description;
      updatedCard.put().then( function(){
        $scope.card = $scope.oldCard;
      }
      );
    }
    $scopd.oldCard = { id: card.id,
                  title: card.title,
                  description: card.description}
    $scope.editCardEnabled  = !$scope.editCardEnabled
  };


}]);
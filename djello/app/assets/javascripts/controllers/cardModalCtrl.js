
djello.controller('cardModalCtrl', [
  '$scope', '$element', 'card', 'close', 'Restangular',
  function($scope, $element, card, close, Restangular) {

  // $scope.name = null;
  // $scope.age = null;
  // console.log("Modal ctrl has card", card)


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

  $scope.cardModal = { id: card.id,
                  title: card.title,
                  description: card.description};

  $scope.editCard = function(input){
    if (input == 'cancel' && $scope.editCardEnabled) {
      $scope.cardModal =  $scope.oldCard;
    }
    else if (input == 'saved' && $scope.editCardEnabled){
      
      var updatedCard = Restangular.one('lists', card.list_id).one('cards', card.id);
      
      updatedCard.title = $scope.cardModal.title;
      updatedCard.description = $scope.cardModal.description;
      updatedCard.put().then( function(){
        console.log("changed");
        //$scope.card = $scope.oldCard;
      }
      );

    }
    $scope.oldCard = { id: card.id,
                  title: card.title,
                  description: card.description};
    $scope.editCardEnabled  = !$scope.editCardEnabled;
  };


}]);
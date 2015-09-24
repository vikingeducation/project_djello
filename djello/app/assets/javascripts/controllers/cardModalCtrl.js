
djello.controller('cardModalCtrl', [
  '$scope', '$element', 'Restangular', 'card', 'list', 'idxInList', 'close',
  function($scope, $element, Restangular, card, list, idxInList, close) {


  $scope.card = card;
  $scope.list = list;



  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      // not needed to send info back b/c databinding
      // card: $scope.card
    }, 500); // close, but give 500ms for bootstrap to animate
    console.log('close method ran');
  };

  //=================card editing methods==================

  // to populate editable data in modal
  var setEditData = function(){
    $scope.oldCard = { id: card.id,
                    title: card.title,
              description: card.description};
  };

  setEditData(); // running fn when modal opens

  var getRectangularObj = function(){
    return Restangular.one('lists', card.list_id)
                                    .one('cards', card.id);
  };

  $scope.editCard = function(input){
    if (input == 'saved' && $scope.editCardEnabled){
      updateCard();
    } else {
      setEditData();
    }
    $scope.editCardEnabled  = !$scope.editCardEnabled;
  };

  var updateCard = function(){
    var updatingCard = getRectangularObj();
    // set restangular obj properties with updated data
    updatingCard.title = $scope.oldCard.title;
    updatingCard.description = $scope.oldCard.description;

    updatingCard.put().then( function(result){
      $scope.card.title = result.title;
      $scope.card.description= result.description;
    } );
  };

  $scope.cardComplete = function(){
    getRectangularObj().remove().then(function(){
      $scope.list.cards.splice(idxInList, 1);
      $scope.close();
    }
      );
  };


}]);
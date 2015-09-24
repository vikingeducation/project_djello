
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
  var setEditData = function(){
    $scope.oldCard = { id: card.id,
                    title: card.title,
              description: card.description};
  };

  var getRectangularObj = function(){
    return Restangular.one('lists', card.list_id)
                                    .one('cards', card.id);
  };

  setEditData();
  $scope.editCard = function(input){
    if (input == 'cancel' && $scope.editCardEnabled) {
      $scope.oldCard =  $scope.card;
    }
    else if (input == 'saved' && $scope.editCardEnabled){
      var updatedCard = getRectangularObj();

      updatedCard.title = $scope.oldCard.title;
      updatedCard.description = $scope.oldCard.description;

      updatedCard.put().then( function(){
        $scope.card.title = updatedCard.title;
        $scope.card.description= updatedCard.description;
        $scope.oldCard = $scope.card; // why is this line necessary?
      } );
    }

    setEditData();

    $scope.editCardEnabled  = !$scope.editCardEnabled;
  };

  $scope.cardComplete = function(){
    getRectangularObj().remove().then(function(){
      $scope.list.cards.splice(idxInList, 1);
    }
      );
  };



}]);
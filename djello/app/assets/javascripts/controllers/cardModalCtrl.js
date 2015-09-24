
djello.controller('cardModalCtrl', [
  '$scope', '$element', 'Restangular', 'card', 'list', 'close',
  function($scope, $element, Restangular, card, list, close) {


  $scope.card = card;
  $scope.list = list;
  $scope.change = false;

  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      // not needed b/c databinding
      // change: $scope.change,
      // card: $scope.card
    }, 500); // close, but give 500ms for bootstrap to animate
    console.log('close method ran');
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
      var updatedCard = Restangular.one('lists', card.list_id)
                                    .one('cards', card.id);

      updatedCard.title = $scope.oldCard.title;
      updatedCard.description = $scope.oldCard.description;

      updatedCard.put().then( function(){
        $scope.card.title = updatedCard.title;
        $scope.card.description= updatedCard.description;
        $scope.oldCard = $scope.card; // why is this line necessary?
      } );
    }

    $scope.oldCard = { id: card.id,
                    title: card.title,
              description: card.description};

    $scope.editCardEnabled  = !$scope.editCardEnabled;
  };


}]);
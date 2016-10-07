Djello.controller('EditCardCtrl', [
  '$scope',
  'close',
  'card',
  'CardService',
  '$rootScope',
  function($scope, close, card, CardService, $rootScope) {

    $scope.card = card
    $scope.close = function(response) {
    	close(response, 200);
    };

    $scope.changeCard = function(data){
      CardService.changeCard($scope.card.id, data)
    }

    $scope.deleteCard = function() {
      CardService.deleteCard($scope.card.id).then(function(){
        close(undefined, 200);
        $rootScope.$broadcast('card.deleted')
      })
    }

  }])

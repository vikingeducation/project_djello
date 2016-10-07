Djello.controller('ShowListCtrl', [
  '$scope',
  '$state',
  'ListService',
  'CardService',
  'Restangular',
  '$rootScope',
  function($scope, $state, ListService, CardService, Restangular, $rootScope) {

    $scope.newCard = false;


    $scope.deleteList = function() {
      ListService.deleteList($scope.list.id).then(function(response){
        $rootScope.$broadcast('list.deleted');
      })
    }

    $scope.createCard = function(card) {
      CardService.createCard($scope.list.id, card).then(function(response){
        $scope.list.cards.push(response);
        $scope.card = {}
        $scope.newCard = false;
      })
    }

    $scope.changeList = function(edit) {
      ListService.changeList($scope.list.id, edit)
    }


  }
])

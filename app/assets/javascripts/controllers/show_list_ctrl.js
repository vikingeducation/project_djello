Djello.controller('ShowListCtrl', [
  '$scope',
  'ListService',
  'CardService',
  'Restangular',
  '$rootScope',
  'ModalService',
  function($scope, ListService, CardService, Restangular, $rootScope, ModalService) {

    $scope.newCard = false;

    $scope.deleteList = function() {
      ListService.deleteList($scope.list.id).then(function(response) {
        $rootScope.$broadcast('list.deleted');
      })
    }

    $scope.createCard = function(card) {
      CardService.createCard($scope.list.id, card).then(function(response) {
        $scope.list.cards.push(response);
        $scope.card = {}
        $scope.newCard = false;
      })
    }

    $scope.changeList = function(edit) {
      ListService.changeList($scope.list.id, edit)
    }

    $scope.editCard = function(card) {
      ModalService.showModal({
        templateUrl: "/templates/cards/edit.html",
        controller: "EditCardCtrl",
        inputs: {
          card: card
        }
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
        });
      })
    }


  }
])

djelloApp.controller('listCtrl',
  ['$scope', 'Restangular', '$location', 'ModalService', 'userService',
  function($scope, Restangular, $location, ModalService, userService){

    $scope.updatedList = $scope.list;
    $scope.updateFieldForListTitle = false;
    $scope.updateFieldForListDescription = false;

    // Adding a card
    $scope.addCard = function(){
      ModalService.showModal({
        templateUrl: 'templates/modals/createCard.html',
        controller: 'cardCtrl',
        inputs: {
          list: $scope.list
        },
        resolve: {
          users: [userService.getUserListFromBackend()]
        }
      }).then(function(modal){
        modal.element.modal();
        modal.close.then(function(result){
          console.log(result);
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
        });
      });
    };

    $scope.beginUpdatingListTitle = function(){
      $scope.updateFieldForListTitle = $scope.updateFieldForListTitle ? false : true;
    };

    $scope.beginUpdatingListDescription = function(){
      $scope.updateFieldForListDescription = $scope.updateFieldForListDescription ? false : true;
    };

    $scope.updateList = function(currentList){

      Restangular.one("lists", currentList.id).get().then(function(listToUpdate) {

        listToUpdate.title = $scope.updatedList.title;
        listToUpdate.description = $scope.updatedList.description;

        listToUpdate.put().then(function(){
          $scope.updateFieldForListTitle = false;
          $scope.updateFieldForListDescription = false;
          $scope.list = $scope.updatedList;
        });
      });
    };

}]);
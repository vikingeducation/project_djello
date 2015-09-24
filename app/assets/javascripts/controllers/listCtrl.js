djelloApp.controller('listCtrl',
  ['$scope', 'Restangular', '$location',
  function($scope, Restangular, $location){

    $scope.updatedList = $scope.list;
    $scope.updateFieldForListTitle = false;
    $scope.updateFieldForListDescription = false;

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
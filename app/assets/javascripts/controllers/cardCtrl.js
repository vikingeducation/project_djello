djelloApp.controller('cardCtrl', ['$scope', '$location', 'close', 'userService', 'Restangular', 'list', function($scope, $location, close, userService, Restangular, list){

  $scope.usersSelected = [];
  $scope.newCard = {};

  $scope.users = userService.getUsers();

  $scope.dismiss = function(result){
    close(result, 200);
  };

  $scope.createCard = function(){
    Restangular.all('cards').post(
      { card: {
                list_id: list.id,
                title: $scope.newCard.title,
                description: $scope.newCard.description
              }
      }).then(function(createdCard){
        $location.path('/boards/'+list.id);
        $scope.newCard = {};
        $scope.dismiss();
    });
  };



}]);
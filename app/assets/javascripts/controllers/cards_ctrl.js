app.controller("CardsCtrl", ['$scope', '$state', 'cardService', function($scope, $state, cardService){

  
  $scope.cards = $scope.list.cards;
  $scope.cardForm = {};
  $scope.cardForm.list_id = $scope.list.id;

  $scope.creatingCard = false;

  $scope.createCard = function(){
    cardService.createCard($scope.cardForm).then(function(response){
      $scope.cards.push(response);

      $scope.creatingCard = false;
      $scope.cardForm = {};
    }, function(){
      console.log("could not create card");

      $scope.creatingCard = false;
      $scope.cardForm = {};
    })
  };

}]);
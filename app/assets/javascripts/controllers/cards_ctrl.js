app.controller("CardsCtrl", ['$scope', '$state', function($scope, $state){

  console.log("loaded");
  $scope.cards = $scope.list.cards;


}]);
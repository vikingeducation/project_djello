djello.directive('cardForm', ['cardService', function(cardService) {
  return {
    templateUrl: '/templates/cards/new.html',
    restrict: 'E',
    scope: {
      addingCard: "=",
      list: "="
    },
    controller: [
    "$scope", "cardService",
    function($scope, cardService) {

      $scope.createCard = function() {
        console.log($scope.newCard.title)
        console.log($scope.list.id)
        $scope.newCard.list_id = $scope.list.id;
        cardService.createCard($scope.newCard) 
                    .then( function(response) {
                      console.log('created', response)
                      $scope.newCard = {};
                    } )
      }

    }]
}}])
djello.directive('cardForm', ['cardService', function(cardService) {
  return {
    templateUrl: '/templates/cards/new.html',
    restrict: 'A',
    scope: {
      addingCard: "=",
      list: "="
    },
    controller: [
    "$scope", "cardService", "$rootScope",
    function($scope, cardService, $rootScope) {

      $scope.createCard = function() {
        $scope.newCard.list_id = $scope.list.id;
        cardService.createCard($scope.newCard) 
                    .then( function(response) {
                      console.log('created', response)
                      $scope.newCard = {};
                      $rootScope.$broadcast($scope.list.id + ".newCard", response);
                    } )
      }

    }]
}}])
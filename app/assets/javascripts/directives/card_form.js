djello.directive('cardForm', ['cardService', function(cardService) {
  return {
    templateUrl: '/templates/cards/card_form.html',
    restrict: 'A',
    scope: true,
    controller: "newCardsCtrl"
}}])
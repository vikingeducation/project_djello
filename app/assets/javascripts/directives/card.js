djello.directive('card', function() {
  return {
    templateUrl: '/templates/cards/directives/card.html',
    restrict: 'E',
    scope: {
      card: '='
    }
  };
});
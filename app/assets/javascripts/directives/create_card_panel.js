app.directive('createCardPanel',
['CardService', function(CardService) {

  return {
    templateUrl: 'templates/directives/create_card_panel.html',
    restrict: 'E',
    scope: {
      list: '=',
    },
    link: function(scope) {
      scope.revealForm = function () {
        scope.editState = true;
      };
    }
  };

}]);

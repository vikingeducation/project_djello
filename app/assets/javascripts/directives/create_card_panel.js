app.directive('createCardPanel',
['CardService', function(CardService) {

  return {
    templateUrl: 'templates/directives/create_card_panel.html',
    restrict: 'E',
    scope: {
      list: '=',
    },
    link: function(scope) {
      scope.newCard = {
        title: '',
        body: '',
        completed: false,
      };
      scope.revealForm = function () {
        scope.editState = true;
      };
      scope.submitForm = function() {
        CardService.create(newCard);
      };
      scope.resetForm = function () {
        scope.newCard = {
          title: '',
          body: '',
          completed: false,
        };
      };
    }
  };

}]);

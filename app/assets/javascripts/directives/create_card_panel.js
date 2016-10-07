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
        list_id: scope.list.id
      };
      scope.revealForm = function () {
        scope.editState = true;
      };
      scope.submitForm = function() {
        CardService.create(scope.newCard)
          .then(scope.cancel);
      };
      scope.cancel = function() {
        scope.editState = false;
        scope.resetForm();
      };
      scope.resetForm = function () {
        scope.newCard = {
          title: '',
          body: '',
          completed: false,
          list_id: scope.list.id
        };
      };
    }
  };

}]);

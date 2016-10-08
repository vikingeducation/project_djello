app.directive('createCardPanel',
['CardService', function(CardService) {

  return {
    templateUrl: 'templates/directives/create_card_panel.html',
    restrict: 'E',
    scope: {
      list: '=',
    },
    link: function(scope) {
      scope.cardForm = {
        title: '',
        body: '',
        completed: false,
        list_id: scope.list.id
      };
      scope.revealForm = function () {
        scope.editState = true;
      };
      scope.submitForm = function() {
        CardService.create(scope.cardForm)
          .then(scope.cancel);
      };
      scope.cancel = function() {
        scope.editState = false;
        scope.resetForm();
      };
      scope.resetForm = function () {
        scope.cardForm = {
          title: '',
          body: '',
          completed: false,
          list_id: scope.list.id
        };
      };
    }
  };

}]);

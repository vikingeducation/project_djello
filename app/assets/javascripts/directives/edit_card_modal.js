app.directive('editCardModal',
['CardService', '$timeout', function(CardService, $timeout) {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/edit_card_modal.html',
    link: function (scope, element) {
      // Have to separate form data from model so as not to have two-way
      // binding.
      scope.cardForm = {
        id: scope.card.id,
        title: scope.card.title,
        body: scope.card.body,
        completed: scope.card.completed
      };
      // See edit-card-body directive.
      scope.bodyEditState = false;
      scope.submitEditForm = function () {
        CardService.update(scope.cardForm);
        scope.bodyEditState = false;
      };

      // Mark completed logic.
      scope.setCompleted = function() {
        scope.cardForm.completed = true;
        return scope.cardForm;
      };
      scope.delayedSetCompleted = function() {
        return $timeout(scope.setCompleted, 700);
      };
      scope.markCompleted = function () {
        element.children('#myModal').modal('hide');
        return Promise.try(scope.delayedSetCompleted)
          .then(scope.submitEditForm)
          .catch(function(reason) {
            console.log(reason);
          });
      };
    }
  };

}]);

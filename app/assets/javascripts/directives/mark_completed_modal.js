app.directive('markCompletedModal',
['$timeout', function ($timeout) {
  return {
    restrict: 'E',
    require: '^editCardModal',
    templateUrl: 'templates/directives/mark_completed_modal.html',
    link: function(scope, element, attrs, ctrl) {

      // Need to access parent directive's controller somehow.
      scope.setCompleted = function() {
        ctrl.cardForm.completed = true;
        return ctrl.cardForm;
      };
      scope.delayedSetCompleted = function() {
        return $timeout(scope.setCompleted, 700);
      };
      scope.markCompleted = function () {
        $('#myModal').modal('hide');
        return Promise.try(scope.delayedSetCompleted)
          .then(scope.submitEditForm)
          .catch(function(reason) {
            console.log(reason);
          });
      };
    }
  };

}]);

app.directive('markCompletedModal',
['$timeout', function ($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/mark_completed_modal.html',
    link: function(scope, element) {
      scope.setCompleted = function() {
        scope.cardForm.completed = true;
        return scope.cardForm;
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

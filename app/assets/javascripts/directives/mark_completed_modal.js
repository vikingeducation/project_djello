app.directive('markCompletedModal',
['$timeout', function ($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/mark_completed_modal.html',
    scope: {
      onComplete: '&',
      onSubmit: '&'
    },
    link: function(scope, element, attrs) {
      // Need to access parent directive's controller somehow.
      scope.delayedSetCompleted = function() {
        return $timeout(scope.onComplete, 450);
      };

      scope.markCompleted = function () {
        $('#myModal').modal('hide');
        return Promise.try(scope.delayedSetCompleted)
          .then(scope.onSubmit)
          .catch(function(reason) {
            console.log(reason);
          });
      };
    }
  };

}]);

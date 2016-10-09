app.directive('editCardModal',
['CardService', 'MemberService', function(CardService, MemberService) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/edit_card_modal.html',
    link: function (scope, element) {
      scope.parentType = 'card';
      MemberService.all(scope.card.id, scope.parentType)
        .then(function(data) {
          scope.membersCache = data;
        });
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

      // Need to think about how you would pass down usersCache as a promise.
    }
  };

}]);

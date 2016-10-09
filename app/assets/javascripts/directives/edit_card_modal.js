app.directive('editCardModal',
['CardService', 'CardMemberService', function(CardService, CardMemberService) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/edit_card_modal.html',
    link: function (scope, element) {
      CardMemberService.all(scope.card.id)
        .then(function(data) {
          scope.cardMembers = data;
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
    }
  };

}]);

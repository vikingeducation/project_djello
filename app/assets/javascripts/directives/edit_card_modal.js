app.directive('editCardModal',
['CardService',
'MemberService',
'UserService',
function(CardService, MemberService, UserService) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/edit_card_modal.html',
    scope: {
      card: '=',
      usersCache: '='
    },
    link: function (scope, element) {
      // Dependencies for user search.
      scope.searchDependencies = {
        parent: scope.card,
        parentType: 'card',
        collection: scope.usersCache,
        searchKey: 'username'
      };

      MemberService.all(scope.card.id, scope.searchDependencies.parentType)
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

      scope.addMember = function () {
        MemberService.create({
          parent_id: scope.card.id,
          parent_type: 'card',
          username: UserService.getSuggestion()
        });
      };
    }
  };

}]);

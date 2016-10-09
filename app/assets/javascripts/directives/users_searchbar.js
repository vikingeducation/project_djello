app.directive('usersSearchbar',
['UserService', 'CardMemberService', function(UserService, CardMemberService) {
  return {
    restrict: 'A',
    // templateUrl: 'templates/directives/users_searchbar.html',
    link: function(scope, element) {
      scope.userNames = scope.usersCache.map(function(user) {
        return user.username;
      });

      // Setup typeahead and configure bloodhound.
      // Need to pass element in this directive. Apparently there are duplicates
      // all over the app...?
      UserService.ttSetup(scope.userNames, element);

      scope.addMember = function () {
        CardMemberService.create({
          card_id: scope.card.id,
          username: scope.userName
        }, scope.card.id);
      };

      // Clicking on a suggestion.
      element.bind('typeahead:select', function (ev, suggestion) {
        scope.userName = suggestion;
      });
    }
  };
}]);

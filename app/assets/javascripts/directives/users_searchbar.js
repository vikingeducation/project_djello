app.directive('usersSearchbar',
['UserService', 'MemberService', function(UserService, MemberService) {
  return {
    restrict: 'A',
    // templateUrl: 'templates/directives/users_searchbar.html',
    link: function(scope, element) {
      scope.userNames = scope.usersCache.map(function(user) {
        return user.username;
      });

      // Setup typeahead and configure bloodhound.
      UserService.ttSetup(scope.userNames);

      scope.addMember = function () {
        MemberService.create({
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

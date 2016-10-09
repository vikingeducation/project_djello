app.directive('usersSearchbar',
['UserService', 'MemberService', function(UserService, MemberService) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/users_searchbar.html',
    link: function(scope) {
      scope.userNames = scope.usersCache.map(function(user) {
        return user.username;
      });

      UserService.ttSetup(scope.userNames);

      scope.addMember = function () {
        MemberService.create({
          card_id: scope.card.id,
          username: scope.userName
        }, scope.card.id);
      };
    }
  };
}]);

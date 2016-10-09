app.directive('usersSearchbar',
['UserService', function(UserService) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/users_searchbar.html',
    link: function(scope, element) {
      scope.userNames = scope.usersCache.map(function(user) {
        return user.username;
      });
      UserService.ttSetup(scope.userNames);
    }
  };
}]);

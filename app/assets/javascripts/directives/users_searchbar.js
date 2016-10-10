app.directive('usersSearchbar',
['UserService', 'MemberService', function(UserService, MemberService) {
  return {
    restrict: 'A',
    scope: {
      collection: '=',
      parent: '=',
      parentType: '=',
      searchKey: '='
    },
    // templateUrl: 'templates/directives/users_searchbar.html',
    link: function(scope, element) {
      // Setup typeahead and configure bloodhound.
      // Need to pass element in this directive. Apparently there are duplicates
      // all over the app...?

      UserService.ttSetup(scope.collection,
                          element,
                          scope.searchKey);

      // Clicking on a suggestion.
      element.bind('typeahead:select', function (ev, suggestion) {
        scope.userName = suggestion;
      });
    }
  };
}]);

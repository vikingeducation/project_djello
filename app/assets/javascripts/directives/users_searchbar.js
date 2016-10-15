// Directives still important to manipulate DOM.
// Controller should never have knowledge of the DOM.

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
    link: function(scope, element) {
      // Need to pass element in this directive. Duplication issue because of
      // ng-repeat.
      // Need to pass copy of collection for data set, not actual object
      // in memory.

      // Setup typeahead and configure bloodhound.
      UserService.ttSetup(scope.collection.cache,
                          element,
                          scope.searchKey);

      // Clicking on a suggestion.
      element.bind('typeahead:select', function (ev, suggestion) {
        UserService.updateSuggestion(suggestion);
      });
    }
  };
}]);

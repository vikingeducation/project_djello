app.directive('usersSearchbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/users_searchbar.html',
    link: function(scope, element) {
      scope.userNames = scope.usersCache.map(function(user) {
        return user.username;
      });
      scope.matchQuery = function (collection) {
        return function (query, syncCB) {
          var regex = new RegExp(query,'i');
          var matches = _.filter(
            collection,
            function (item) {
              // Typeahead is working. Algo just needs work.
              return regex.test(item);
            }
          );
          return syncCB(matches);
        };
      };

      $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'users-dataset',
        source: scope.matchQuery(scope.userNames),
        templates: {
          pending: '<p></p>'
        }
      });
    }
  };
});

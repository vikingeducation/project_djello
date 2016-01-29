djello.directive('list', function() {
  return {
    templateUrl: '/templates/lists/directives/list.html',
    restrict: 'E',
    scope: {
      list: '=',
      deleteList: '&'
    }
  };
});
djello.directive('listItem', ['listService', function(listService) {
  return {
    templateUrl: '/templates/lists/list_item.html',
    restrict: 'E',
    scope: {
      list: '=',
      updating: "=",
      changeUpdateStatus: "&"
    },
    link: function(scope) {
      scope.changeUpdateStatus = function() {
        scope.updating = !scope.updating;
        console.log(scope.updating);
      };

      scope.updateList = function() {
        listService.updateList(scope.list);
        scope.changeUpdateStatus();
      }

      scope.deleteList = function(id) {
        listService.delete(id);
      }
    }
  }
}])
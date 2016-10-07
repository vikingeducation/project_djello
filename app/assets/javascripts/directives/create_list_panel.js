app.directive('createListPanel',
['ListService', function(ListService) {

  return {
    templateUrl: 'templates/directives/create_list_panel.html',
    restrict: 'E',
    link: function(scope) {
      scope.editState = false;
      scope.toggleEditState = function () {
        scope.editState = true;
      };
    }
  };

}]);

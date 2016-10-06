app.directive('createListPanel',
['ListService', function(ListService) {

  return {
    templateUrl: 'templates/directives/create_list_panel.html',
    restrict: 'E'
  };

}]);

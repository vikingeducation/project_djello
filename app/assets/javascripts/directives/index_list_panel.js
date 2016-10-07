app.directive('indexListPanel', ['ListService', function (ListService) {

  return {
    templateUrl: 'templates/directives/index_list_panel.html',
    restrict: 'E'
  };

}]);

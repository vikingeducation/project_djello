djelloApp.directive('boardList', function(){

  return {
    templateUrl: 'templates/directives/list.html',
    restrict: 'A',
    scope: true,
    controller: 'listCtrl'
  };

});
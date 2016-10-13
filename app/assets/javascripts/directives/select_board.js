app.directive('selectBoard', function(){
  return {
    templateUrl: "/templates/directives/select_board.html",
    restrict: "E",
    controller: "BoardsCtrl",
    scope: false
  }
});
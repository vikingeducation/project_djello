app.directive('cards', function(){
  return {
    templateUrl: "/templates/directives/cards.html",
    restrict: "E",
    controller: "CardsCtrl",
    scope: {
      list: "="
    }
  }
});
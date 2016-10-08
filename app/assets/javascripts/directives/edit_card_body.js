app.directive('editCardBody',
['CardService', function(CardService) {

  return {
    templateUrl: 'templates/directives/edit_card_body.html',
    restrict: 'E',
    link: function(scope) {
      scope.revealForm = function () {
        scope.bodyEditState = true;
      };
      scope.cancel = function() {
        scope.bodyEditState = false;
      };
    }
  };

}]);

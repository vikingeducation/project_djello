app.directive('saveListChanges', function() {

  return {
    templateUrl: 'templates/directives/save_list_changes.html',
    restrict: 'E',
    scope: {
      beingEdited: '&',
      hideForm: '&'
    }
  };

});




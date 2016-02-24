djello.directive('clickToEdit', function() {
  
  return {
    restrict: "A",
    // replace element with editor
    replace: true,
    templateUrl: '/templates/shared/clickToEdit.html',

    scope: {
      value: "=clickToEdit",
      id: '=',
      model: '@',
      attribute: '@'
    },

    controller: 'EditCtrl'

  };
});
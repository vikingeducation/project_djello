djello.directive("clickToEdit", function() {
  return {
    restrict: "A",
    replace: true,
    templateUrl: '/templates/shared/clickToEdit.html',

    scope: {
      value: "=clickToEdit",
      id: '=',
      model: '@',
      attribute: '@'
    },

    controller: ['$scope', 'Restangular', function($scope, Restangular) {
      $scope.view = {
        editableValue: $scope.value,
        editorEnabled: false
      };

      $scope.enableEditor = function() {
        $scope.view.editorEnabled = true;
        $scope.view.editableValue = $scope.value;
        // focus on div_class='click-to-edit' >> input
        //console.log($('.click-to-edit input:visible')[0]);
        //$('.click-to-edit input:visible').focus();
      };

      $scope.disableEditor = function() {
        $scope.view.editorEnabled = false;
      };

      $scope.save = function() {
        $scope.value = $scope.view.editableValue;
        $scope.disableEditor();

        var obj = {};
        obj[$scope.attribute] = $scope.value;
        Restangular.one($scope.model, $scope.id).patch( obj );
      };

      $scope.cancel = function() {
        $scope.disableEditor();
      };
    }]
  }
})
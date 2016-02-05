djello.controller('EditCtrl',
  ['$scope', '$timeout', 'Restangular', 'flashService',
  function($scope, $timeout, Restangular, flashService) {

    $scope.flash = '';

    $scope.view = {
      editableValue: $scope.value,
      editorEnabled: false
    };

    $scope.enableEditor = function(event) {
      $scope.view.editorEnabled = true;
      $scope.view.editableValue = $scope.value;
    };

    $scope.disableEditor = function() {
      $scope.view.editorEnabled = false;
    };

    $scope.save = function() {
      // able to grab different models and patch the chosen attribute
      // save on submit
      var obj = {};
      obj[$scope.attribute] = $scope.view.editableValue;

      var model_name = $scope.buildModelName($scope.model);

      Restangular.one($scope.model, $scope.id).patch( obj )
        .then(function() {
          $scope.value = $scope.view.editableValue;
          $scope.disableEditor();
          $scope.setFlash((model_name + " " + $scope.attribute), 'update', true);
        }, function() {
          $scope.disableEditor(); 
          $scope.setFlash((model_name + " " + $scope.attribute), 'update', false) 
        });
    };

    $scope.buildModelName = function(model) {
      var name = model.charAt(0).toUpperCase();

      for (var i = 1; i < model.length - 1; i++) {
        name = name + model.charAt(i);
      };

      return name;
    };

    // cancel on blur
    $scope.cancel = function() {
      $scope.disableEditor();
    };

    $scope.setFlash = function(obj, actionType, bool) {
      $scope.flash = flashService.updateFlash(obj, actionType, bool);
      $timeout(function() {
        $scope.flash = '';
      }, 3500, true);
    };

    $scope.showFlash = function() {
      return !!($scope.flash);
    };
      
}]);
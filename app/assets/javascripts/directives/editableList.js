app.directive("editableList", function(){
  var template = '<div class="panel panel-primary" >\
                    <div class="panel-heading">\
                      <h3 ng-hide="view.editorEnabled" class="panel-title" ng-click="enableEditor()">  {{ value }}</h3>\
                      <h3 ng-show="view.editorEnabled" class="panel-title">\
                        <input style="background-color: gray;" ng-model="view.editableValue">\
                        <a ng-click="save()">Save</a>\
                        <a ng-click="disableEditor()()">Cancel</a>\
                      </h3>\
                      <h6 class="panel-title"> {{ list.description }}</h6>\
                    </div>\
                    <div class="panel-body">\
                      Panel content\
                    </div>\
                  </div>'

  return {
    restrict: "A",
    replace: true,
    template: template,
    scope: {
        value: "=editableList",
    },
    controller: function($scope) {
        $scope.view = {
            editableValue: $scope.value,
            editorEnabled: false
        };

        $scope.enableEditor = function() {
            $scope.view.editorEnabled = true;
            $scope.view.editableValue = $scope.value;
        };

        $scope.disableEditor = function() {
            $scope.view.editorEnabled = false;
        };

        $scope.save = function() {
            $scope.value = $scope.view.editableValue;
            $scope.disableEditor();
        };
    }
};
})

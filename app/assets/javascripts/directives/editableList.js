app.directive("editableList", function(){
  var template = '<div class="panel panel-primary list-display" >\
                    <div class="panel-heading">\
                      <h3 ng-hide="view.editorEnabled" class="panel-title" ng-click="enableEditor()">  {{ value.title }}</h3>\
                      <h6 ng-hide="view.editorEnabled" class="panel-title">{{ value.description }}</h6>\
                      <h3 ng-show="view.editorEnabled" class="panel-title">\
                        <label>\
                        Title\
                        <input style="background-color: gray;" ng-model="view.editableValue.title"></br>\
                        </label>\
                        <label>\
                        Description\
                        <input style="background-color: gray;" ng-model="view.editableValue.description">\
                        <label>\
                        <a class="btn btn-success" ng-click="save()">Save</a>\
                        <a class="btn btn-danger" ng-click="disableEditor()()">Cancel</a>\
                      </h3>\
                    </div>\
                    <div class="panel-body">\
                      <div class="col-xs-12 list-card well" ng-repeat="card in value.cards">\
                        {{card.title}}\
                      </div>\
                      <div class="add-card">\
                        <input type="text" ng-model="newCardName">\
                        <button class="btn btn-xs btn-success" ng-click="createCard()">Add</button>\
                      </div>\
                    </div>\
                  </div>'

  return {
    restrict: "A",
    replace: true,
    template: template,
    scope: {
        value: "=editableList",
        editList: "&",
        addCard: "&",
    },
    controller: function($scope) {
        $scope.newCardName = "";

        $scope.view = {
            editableValue: {title: $scope.value.title, description: $scope.value.description},
            editorEnabled: false
        };

        $scope.enableEditor = function() {
            $scope.view.editorEnabled = true;
            $scope.view.editableValue = $scope.value;
        };

        $scope.disableEditor = function() {
            $scope.view.editorEnabled = false;
        };

        $scope.save = function(id) {
            $scope.disableEditor();
            $scope.editList({listid: $scope.value.id, result: {list: $scope.view.editableValue}});
            $scope.value.title = $scope.view.editableValue.title;
            $scope.value.description = $scope.view.editableValue.description;
        };

        $scope.createCard = function(){
            $scope.addCard({card: {title: $scope.newCardName, description: "", list_id: $scope.value.id}})
            $scope.value.cards.push({title: $scope.newCardName, description: "", list_id: $scope.value.id});
        }
    }
};
})

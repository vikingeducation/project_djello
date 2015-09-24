djelloApp.directive('listDirective', function(){



  return {
    restrict: "A",
    replace: true,
    // template: '<div><div class="panel-heading"><h2 class="panel-title" ng-hide="editable" ng-click="enableEdit()">{{listAttr.title}}</h2><p class="panel-title" ng-hide="editable" ng-click="enableEdit()">{{listAttr.description}}</p><input ng-show="editable" ng-model="listAttr.title" ><input ng-show="editable" ng-model="listAttr.description" ><button  ng-click="saveList(listAttr.title)">Save</button></div><div ng-repeat="card in list.cards" class="panel panel-default">{{card.title}}</div><h2 class="text-center"><a ng-click="createCard(list)">Add a Card</a></h2></div>',
    templateUrl : "templates/listDirective.html",
    scope: {
      list: '=',
      updateList: "&",
      addCard: "&"
    },
    
    controller: function( $scope ){
      $scope.listAttr = {
        title: $scope.list.title,
        desription: $scope.list.description
      };

      $scope.editable = false;

      $scope.enableEdit = function(){
        $scope.editable = true;
      };

      $scope.saveList = function(title){
        $scope.editable = false;

        $scope.list.title = $scope.listAttr.title;
        $scope.list.description = $scope.listAttr.description;
        $scope.updateList();
        
      };

      $scope.newCard = "";

      $scope.createCard = function(list){
        $scope.addCard(list);
      };
    }
  };

});
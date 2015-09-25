djelloApp.directive('listDirective', function(){



  return {
    restrict: "A",
    replace: true,
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
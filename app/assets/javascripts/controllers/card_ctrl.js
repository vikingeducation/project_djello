app.controller("CardCtrl", ['$scope', 'close', 'card', function($scope, close, card){

  $scope.card = card;

  $scope.editingTitle = false;
  $scope.editingDescription = false;

  $scope.updateTitle = function(){
    // $scope.$apply(function(){
      $scope.editingTitle = false;
    // })
    $scope.card.patch();
  };

  $scope.updateDescription = function(){
    // $scope.$apply(function(){
      $scope.editingDescription = false;
    // })
    $scope.card.patch();
  };

  // $scope.form = {};
  // $scope.form.title = $scope.card.title;
  // $scope.form.description = $scope.card.description;

  $scope.closeCard = function(result){
    close(result, 300);
  };

  // handling inplace editing
  $scope.toggleTitle = function(event){
    event.stopPropagation();
    var $ignore = $(".edit-title");
    if(!$scope.editingTitle){
      $scope.editingTitle = true;
      //set listener to switch editingTitle to false on the click of anything besides the title form
      
      $(document).click(function(){
        
        $scope.$apply(function(){
          $scope.editingTitle = false;
        })
        

        $(document).off('click');
        $ignore.off('click');
      });

      $ignore.click(function(event){
        console.log("ignoring");
        event.stopPropagation();
      })
    } else if($scope.editingTitle){
      $scope.editingTitle = false;
    }

  };//end toggleTitle

  $scope.toggleDescription = function(event){
    event.stopPropagation();
    var $ignore = $(".edit-description");
    if(!$scope.editingDescription){
      $scope.editingDescription = true;
      //set listener to switch editingDescription to false on the click of anything besides the description form
      $(document).click(function(){
        $scope.$apply(function(){
          $scope.editingDescription = false;
        })

        $(document).off('click');
        $ignore.off('click');
      });

      $ignore.click(function(event){
        event.stopPropagation();
      })
    } else if($scope.editingDescription){
      $scope.editingDescription = false;
    }
  };
  

}]);
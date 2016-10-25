app.controller("CardCtrl", ['$scope', 'close', 'card', 'memberService', function($scope, close, card, memberService){

  // DISPLAY ACTIVITY

  $scope.card = card;
  $scope.activities = $scope.card.activities 

  //get all users for add membership form
  memberService.getUsers().then(function(response){
    $scope.users = response;
  }, function(){
    console.log("could not get all users");
  });

  $scope.editingTitle = false;
  $scope.editingDescription = false;

  $scope.updateTitle = function(){
    $scope.editingTitle = false;
   
    $scope.card.patch().then(function(response){
      $scope.activities = response.activities;
      
      
    }, function(){
      console.log("could not update card");
    });
  };

  $scope.updateDescription = function(){
    $scope.editingDescription = false;
    $scope.card.patch()
    .then(function(response){
      $scope.activities = response.activities;
      
      
    }, function(){
      console.log("could not update card");
    });
  };

  $scope.markCompleted = function(){
    $scope.card.completed = true;
    $scope.card.patch();

    $scope.closeCard("result");
  };



  $scope.addMember = function(){
    var data = { card_id: $scope.card.id, user_id: $scope.selectedUserId };
    memberService.createMembership(data).then(function(response){
      $scope.card.members.push(response);
    }, function(){
      console.log("couldn't create membership");
    });
  };

  $scope.removeMember = function(member){

  };

  

  $scope.closeCard = function(result){
    close(result, 1);
    //get rid of persistent modal backdrop
    $(".modal-backdrop").remove();
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

      //make the element ignore the click event on the document
      $ignore.click(function(event){
        
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

      //make the form ignore the document click event
      $ignore.click(function(event){
        event.stopPropagation();
      })
    } else if($scope.editingDescription){
      $scope.editingDescription = false;
    }
  };
  

}]);
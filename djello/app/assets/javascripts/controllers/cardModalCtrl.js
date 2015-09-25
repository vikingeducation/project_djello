
djello.controller('cardModalCtrl', [
  '$scope', '$element', 'card', 'close', 'users', 'Restangular', 'dataService',
  function($scope, $element, card, close, users, Restangular, dataService) {

  $scope.users = users;
  $scope.card = card;

  var existingMember = function(id){
    console.log("checking existing members")
    for(var i=0; i<$scope.cardModal.members.length; i++){
      if($scope.cardModal.members[i].id==id){
        console.log("found member")
        return true
      }
    }
    return false
  };

  $scope.warning = "";


  $scope.addMember = function(card, user){
    var member = JSON.parse(user);
    console.log("remove", member.id);
  
    if(existingMember(member.id)){
      $scope.warning = "Card already have this user";
    }
    else{
      $scope.warning = "";
      Restangular.all('memberships').post(
            { membership: { user_id: member.id ,
                            card_id: card.id }})
              .then(function(createdMembership){
                
                  $scope.cardModal.members.push(member);
                    });
    }
  };

  var checkMemberships = function(member){
    Restangular.one('cards', $scope.card.id).all('memberships').getList(function(memberships){
      console.log(memberships);
      console.log(memberships.length);
      for(var i=0; i<memberships.length; i++){
        if(memberships[i].user_id==member.id){
          var id = card.memberships[i].id;
          return id;
        }
      }
      return false;

    });
  };

  $scope.removeMember = function(member){
    
    console.log("remove", member.id);
    var id = checkMemberships(member);
    console.log("membership", id);
    if(id){
     Restangular.one('memberships', id).remove();
     console.log(id);
      for(var j=0; j < $scope.cardModal.members.length; j++){
          console.log($scope.cardModal.members[j]);

          if ($scope.cardModal.members[j].user_id == member.id) {
            $scope.cardModal.members.splice(j,1);
            break;
          
        }
      }
    } else {
      $scope.warning = "No membership was found for this member";
    }
    
    
  };

  $scope.close = function() {
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
    console.log('close method ran');
  };

  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    console.log('cancel method ran');
    //  Now call close, returning control to the caller.
    close({}, 500); // close, but give 500ms for bootstrap to animate
  };

  //=================card editing methods==================

  $scope.cardModal = { id: card.id,
                  title: card.title,
                  description: card.description,
                  members: card.members,
                  
                };

  //===Adding members to cardModal====//
  

  $scope.editCard = function(input){
    if (input == 'cancel' && $scope.editCardEnabled) {
      $scope.cardModal =  $scope.oldCard;
    }
    else if (input == 'saved' && $scope.editCardEnabled){
      
      var updatedCard = Restangular.one('lists', card.list_id).one('cards', card.id);
      
      updatedCard.title = $scope.cardModal.title;
      updatedCard.description = $scope.cardModal.description;
      updatedCard.put().then( function(){

      }
      );

    }
    $scope.oldCard = { id: card.id,
                  title: card.title,
                  description: card.description};
    $scope.editCardEnabled  = !$scope.editCardEnabled;
  };


}]);
djello.controller('CardCtrl', ['$scope', 'close', 'card', 'list', '$timeout', 'MemberService', 'Auth', 'Restangular', function($scope, close, card, list, $timeout, MemberService, Auth, Restangular) {

 Auth.currentUser()
      .then(function(user){
        $scope.currentUser = user;
      }, function(response) {
        console.error(response);
      }); 

 $scope.card = card;
 $scope.list = list;
 Restangular.restangularizeCollection(null, card.members, 'members');


// populate list of members to potentially add
 MemberService.getMembers()
    .then(function(response){
      var currentMemIDs = [$scope.currentUser.id]
      _.forEach($scope.card.members, function(member){
        currentMemIDs.push(member.id);
      });
      $scope.membersToAdd = [];
      _.forEach(response, function(member){
        if (!(_.includes(currentMemIDs, member.id))){
          $scope.membersToAdd.push(member);
        }
      })
      console.log($scope.membersToAdd);
    });


  
 $scope.close = function(result) {
    close(result, 500);
 };

 $scope.toggleTitleEditing = function() {
    $scope.titleEditing = !$scope.titleEditing;
 };

 $scope.updateCardTitle = function(){
    $scope.titleEditing = false;
    $scope.card.patch()
  };

  $scope.editCardTitle = function(){
    $scope.toggleTitleEditing();
    $timeout(function(){
      $('#cardTitleEdit').focus();
    }, 200);
  };

  $scope.editCardDesc = function(card) {
    card.descEditing = true;
    $timeout(function(){
      $('[card-desc-id="'+ card.id + '"]').focus();
    }, 200);
  };

  $scope.updateCardDesc = function(card) {
    card.descEditing = false;
    card.patch();
  }

  $scope.deleteCard = function(){
    var index = _.indexOf($scope.list.cards, $scope.card)
    $scope.list.cards.splice(index, 1);
    $scope.card.remove()
  }

  $scope.showMembers = function(){
    $scope.addingMember = true;
  }

  $scope.addMember = function(memID){
    var newMem = _.find($scope.membersToAdd, function(member){
      return member.id == memID;
    });
    $scope.card.members.push(newMem);
    var memIndex = _.findIndex($scope.membersToAdd, newMem);
    $scope.membersToAdd.splice(memIndex, 1);
    MemberService.addMember($scope.card.id, memID);
  }

}]);
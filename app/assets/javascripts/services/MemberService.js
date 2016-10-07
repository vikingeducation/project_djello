djello.factory('MemberService', ['Restangular', function(Restangular){
  var memberService = {};
  var _members = [];
  var _memberships = [];

  memberService.getMembers = function(){
    return Restangular.all('users').getList()
      .then(function(response){
        angular.copy(response, _members);
        return _members;
      })
  };

  memberService.getMemberships = function(){
    return Restangular.all('memberships').getList()
    .then(function(response){
      angular.copy(response, _memberships);
      return _memberships;
    })
  }

  memberService.addMember = function(cardID, userID){
    return Restangular.all('memberships').post({
      cardID: cardID,
      userID: userID
    })
  };

  memberService.removeMember = function(id){
    return Restangular.one('memberships', id).remove()
      .then(function(response){
        memberService.getMemberships();
      });
  }


  return memberService;
}])
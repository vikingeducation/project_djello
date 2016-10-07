djello.factory('MemberService', ['Restangular', function(Restangular){
  var memberService = {};

  var _members = [];

  memberService.getMembers = function(){
    return Restangular.all('users').getList()
      .then(function(response){
        angular.copy(response, _members);
        return _members;
      })
  }

  memberService.addMember = function(cardID, userID){
    return Restangular.all('memberships').post({
      cardID: cardID,
      userID: userID
    })

  }


  return memberService;
}])
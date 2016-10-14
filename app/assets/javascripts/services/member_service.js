app.factory("memberService", ['Restangular', function(Restangular){

  var service = {};

  service.getUsers = function(){
    return Restangular.all("users").getList();
  };

  service.createMembership = function(data){
    var membership = { card_membership: data };
    return Restangular.all("card_memberships").post(membership);
  };

  return service;

}])
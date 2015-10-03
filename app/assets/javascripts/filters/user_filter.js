djello.filter('userFilter', function(){
  return function(users, members) {
    return users.filter(function(user) {
      var contain = false;
      members.forEach(function(member){
        if (member.id == user.id) {
          contain = true;
        }
      })
      if (contain) {
        return false;
      } else {
        return true;
      }
    })
  }
})
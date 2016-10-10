Djello.filter('filterMembers', ['_', function(_){

  return function(collection, currentMembers) {
    var member_ids = _.map(currentMembers, 'id');
    var filteredCollection = []
    angular.forEach(collection, function(member){
      if(!_.includes(member_ids, member.id)){
        filteredCollection.push(member);
      }
    })
    return filteredCollection;
  }

}])

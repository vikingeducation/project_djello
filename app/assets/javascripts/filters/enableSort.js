djello.filter('enableSort', function() {
    return function(input) {
      var out = [];
      for(i in input){
        out.push(input[i]);
      }
      return out;
    }
  })
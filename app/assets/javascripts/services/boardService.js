app.factory("BoardService", ['Restangular', function(Restangular){
  var boards = {}

  Restangular.all("boards").getList().then(function(data){
    boards.list = data;
    for (var i = 0; i < boards.list.length; i++) {
      boards.list[i].boardIndex = i;
    };
    boards.selectedBoard = boards.list[0].id
  })

  return {
    boards: boards
  }
}]);

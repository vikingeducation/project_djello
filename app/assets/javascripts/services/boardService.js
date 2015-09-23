app.factory("BoardService", ['Restangular', function(Restangular){
  var boards = {}

  Restangular.all("boards").getList().then(function(data){
    boards.list = data;
  })

  return {
    boards: boards
  }
}]);

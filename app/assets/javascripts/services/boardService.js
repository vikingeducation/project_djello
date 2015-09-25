app.factory("BoardService", ['Restangular', function(Restangular){
  var boards = {}
  var users = {}

  Restangular.all("boards").getList().then(function(data){
    boards.list = data;
    boards.selectedBoard = boards.list[0].id
  })

  Restangular.all("users").getList().then(function(data){
    users.users = data;
  })

  return {
    boards: boards,
    users: users
  }
}]);

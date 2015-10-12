djello.factory('listService', ['Restangular', function(Restangular){
  var lists = {};

  function getLists(board_id) {
    Restangular.one('boards', board_id).all('lists').getList().then(function(data){
      lists.data = data;
    }, function(error){
      console.log('Fail to get lists: ', error);
    })
  }

  function createList(listForm, board) {
    board.data.all('lists').post({
      list: {
        name: listForm.name,
        board_id: board.data.id
      }
    })
    .then(function(newList){
      lists.data.push(newList);
      listForm.name = "";
    })
  }

  function updateList(list) {
    list.put();
  }

  return {
    lists: lists,
    getLists: getLists,
    createList: createList,
    updateList: updateList
  }
}])
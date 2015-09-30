djello.factory('listService', ['Restangular', function(Restangular){
  var lists = {};

  function getLists(board_id) {
    Restangular.one('boards', board_id).all('lists').getList().then(function(listList){
      lists.listList = listList;
    }, function(error){
      console.log('Fail to get lists: ', error);
    })
  }

  return {
    lists: lists,
    getLists: getLists
  }
}])
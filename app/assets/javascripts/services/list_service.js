Djello.factory('ListService', [
  'Restangular',
  function(Restangular) {

    var createList = function(board_id, data) {
      return Restangular.one("boards", board_id).post('lists',data)
    };

    var getList = function(id) {
      return Restangular.one('lists', id).get();
    };

    var changeList = function(list_id, edit) {
      var data = {}
      data['list'] = edit;
      return Restangular.one('lists', list_id).patch(data)
    }

    var deleteList = function(list_id) {
      return Restangular.one('lists', list_id).remove();
    }

    return {createList: createList, getList: getList, deleteList: deleteList, changeList: changeList};

  }
])

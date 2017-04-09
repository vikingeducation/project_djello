djello.factory('listService',
  ['Restangular',
  function(Restangular) {

    listService = {};

    listService.getAll = function(board_id) {
      return Restangular.all('lists').getList( {board_id: board_id} );
    }

    listService.createList = function(newList) {
      return Restangular.all('lists')
                        .post( { list: { title: newList.title,
                                         description: newList.description } } );
    }

    listService.delete = function(list) {
      return Restangular.one('lists', list.id)
                        .remove( { id: list.id } );
    }


    return listService;

  }])
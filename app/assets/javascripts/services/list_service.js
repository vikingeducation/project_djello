djello.factory('listService',
  ['Restangular', '$rootScope',
  function(Restangular, $rootScope) {

    listService = {};

    listService.getAll = function(id) {
      return Restangular.all('lists').getList( {board_id: id} );
    }

    listService.createList = function(newList) {
      return Restangular.all('lists')
                        .post( { list: { board_id: newList.board_id,
                                         title: newList.title,
                                         description: newList.description } } );
    }

    listService.updateList = function(list) {
      return Restangular.one('lists', list.id)
                        .patch( { list: { title: list.title,
                                          description: list.description } } )
    }

    listService.transferCard = function(card, list_id) {

    }

    listService.delete = function(id) {
      return Restangular.one('lists', id)
                        .remove( { id: id } )
                        .then( function() {
                          $rootScope.$broadcast('lists.changed')
                        });
    }


    return listService;

  }])
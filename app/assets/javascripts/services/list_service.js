app.factory('ListService',
['Restangular', '_', function(Restangular, _) {

  var ListService = {};
  var _boardListsCache = {};

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  // Actually store lists array in noSQL db
  function _storeLists (board_id) {
    return function (response) {
      if (!_boardListsCache[board_id]) {
        _boardListsCache[board_id] = [];
      }
      angular.copy(
        response,
        _boardListsCache[board_id]
      );
      return _boardListsCache;
    };
  }

  // Make sure Rails API sends back the list object after creation.
  function _addList (response) {
    if (!_.isEmpty(_boardListsCache[response.board_id])) {
      _boardListsCache[response.board_id].push(response);
    } else {
      _boardListsCache[response.board_id] = [];
      _boardListsCache[response.board_id].push(response);
    }
    return _boardListsCache;
  }

  function _updateList (response) {
    var lists = _boardListsCache[response.board_id];
    var found = _.find(lists, {id: response.id});
    if (!found) throw new Error ('Nothing to update!!');
    angular.copy(response,found);
    return found;
  }

  function _removeList (list, board_id) {
    return function (response) {
      var found = _.find(_boardsLists[board_id], {id: list.id});
      if (!found) throw new Error('Nothing to remove!!');
      _.remove(_boardListsCache[board_id], {id: list.id});
      return list;
    };
  }

  // Make get request to Rails API
  function _cacheLists (id) {
    return Restangular.all('lists')
      .getList({board_id: id})
      .then(_storeLists(id))
      .catch(_logError);
  }

  // Have a ListService take care of grabbing lists for a board.
  ListService.create = function (listParams) {
    return Restangular.all('lists')
      .post({list: listParams})
      .then(_addList)
      .catch(_logError);
  };

  ListService.update = function (listParams) {
    return Restangular.one('lists',listParams.id)
      .patch({list: listParams})
      .then(_updateList)
      .catch(_logError);
  };

  // Public interface for a board's lists.
  ListService.all = function (board_id) {
    if (_.isEmpty(_boardListsCache[board_id])) {
      return _cacheLists(board_id);
    } else {
      return Promise.resolve(_boardListsCache);
    }
  };

  ListService.destroy = function(list, board_id) {
    return list.remove()
      .then(_removeList(list, board_id))
      .catch(_logError);
  };

  return ListService;

}]);

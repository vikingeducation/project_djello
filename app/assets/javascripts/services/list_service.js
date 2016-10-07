app.factory('ListService',
['Restangular', '_', function(Restangular, _) {

  var ListService = {};
  var _boardLists = {};

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  // Actually store lists array in noSQL db
  function _storeLists (board_id) {
    return function (response) {
      if (!_boardLists[board_id]) {
        _boardLists[board_id] = [];
      }
      angular.copy(
        response,
        _boardLists[board_id]
      );
      return _boardLists;
    };
  }

  // Make sure Rails API sends back the list object after creation.
  function _addList (response) {
    if (!_.isEmpty(_boardLists[response.board_id])) {
      _boardLists[response.board_id].push(response);
    } else {
      _boardLists[response.board_id] = [];
      _boardLists[response.board_id].push(response);
    }
    return _boardLists[response.board_id];
  }

  function _updateList (response) {
    var lists = _boardLists[response.board_id];
    angular.copy(response,_.find(lists, {id: response.id}));
  }

  function _removeList (response) {
    _.remove(_boardLists[respone.board_id], function(list) {
      return list.id === response.id;
    });
  }

  // Make get request to Rails API
  function _cacheLists (id) {
    return Restangular.all('lists')
      .getList({board_id: id})
      .then(_storeLists(id))
      .catch(_logError);
  }

  ListService.refreshListsInfo = function (listsInfo, id) {
    return function () {
      listsInfo[id].lists = _boardLists[id];
    };
  };

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

  // Public interface for board's lists.
  ListService.all = function (board_id) {
    if (_.isEmpty(_boardLists[board_id])) {
      return _cacheLists(board_id);
    } else {
      return Promise.resolve(_boardLists);
    }
  };

  ListService.destroy = function(list, board_id) {
    return function (response) {
      var lists = _boardLists[board_id];
      return _.remove(lists,{id: list.id});
    };
  };

  return ListService;

}]);

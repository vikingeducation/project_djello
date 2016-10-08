app.factory('BoardService',
['Restangular', '_', function(Restangular,_) {

  var BoardService = {};
  // Call it the 'cache' to be more explicit about the intent.
  var _boardsCache = [];


  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  function _storeBoards (response) {
    return angular.copy(response, _boardsCache);
  }

  function _cacheBoards () {
    return Restangular.all('boards')
      .getList()
      .then(_storeBoards)
      .catch(_logError);
  }

  function _addBoard(response) {
    _boardsCache.push(response);
    return response;
  }

  function _removeBoard (board_id) {
    return function (response) {
      var found = _.find(_boardsCache, {id: parseInt(board_id)});
      if (!found) throw new Error('Nothing to remove!!');
      return _.remove(_boardsCache,{id: board_id});
    };
  }

  function _findBoard(searchKey) {
    return function(response) {
      var found = _.find(_boardsCache, {id: parseInt(searchKey)});
      // Throw an error for your bad path!
      if (!found) throw new Error('Board not cached!!');
      return found;
    };
  }

  BoardService.refreshCache = function () {
    return _cacheBoards();
  };

  BoardService.all = function () {
    if (_.isEmpty(_boardsCache)) return _cacheBoards();
    return Promise.resolve(_boardsCache);
  };

  BoardService.one = function (searchId) {
    if (_.isEmpty(_boardsCache)) {
      return _cacheBoards()
        .then(_findBoard(searchId));
    } else {
      // Use try to start your promise chain.
      return Promise.try(_findBoard(searchId));
    }
  };

  BoardService.create = function (formParams) {
    return Restangular.all('boards')
      .post({board: formParams })
      .then(_addBoard)
      .catch(_logError);
  };

  BoardService.destroy = function(board) {
    return board.remove()
      .then(_removeBoard(board.id))
      .catch(_logError);
  };

  return BoardService;

}]);

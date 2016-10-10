app.factory('BoardService',
['Restangular', '_', function(Restangular,_) {

  var BoardService = {};
  var _data = {
    cache: [],
    status: 'success'
  };
  // var _boardsCache = [];


  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
    return Promise.reject(reason);
  }

  function _errorStatus (response) {
    switch (response.status) {
      case -1:
        _data.status = 'timeout';
        break;
    }
    return _data;
  }

  function _storeBoards (response) {
    angular.copy(response, _data.cache);
    return _data;
  }

  function _cacheBoards () {
    return Restangular.all('boards')
      .withHttpConfig({timeout: 10})
      .getList()
      .catch(_logError)
      .then(_storeBoards,_errorStatus);
  }

  function _addBoard(response) {
    _data.cache.push(response);
    return response;
  }

  function _removeBoard (board_id) {
    return function (response) {
      var found = _.find(_data.cache, {id: parseInt(board_id)});
      if (!found) throw new Error('Nothing to remove!!');
      return _.remove(_data.cache,{id: board_id});
    };
  }

  function _findBoard(searchKey) {
    return function(response) {
      var found = _.find(_data.cache, {id: parseInt(searchKey)});
      // Throw an error for your bad path!
      if (!found) throw new Error('Board not cached!!');
      return found;
    };
  }

  BoardService.refreshCache = function () {
    return _cacheBoards();
  };

  BoardService.all = function () {
    if (_.isEmpty(_data.cache)) return _cacheBoards();
    return Promise.resolve(_data);
  };

  BoardService.one = function (searchId) {
    if (_.isEmpty(_data.cache)) {
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

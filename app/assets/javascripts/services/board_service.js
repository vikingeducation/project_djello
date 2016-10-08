app.factory('BoardService',
['Restangular', '_', function(Restangular,_) {

  var BoardService = {};
  var _boards = [];
  var _currentUserBoards = [];

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  function _storeBoards (response) {
    return angular.copy(response, _boards);
  }

  function _storeCurrentUserBoards (response) {
    return angular.copy(response, _currentUserBoards);
  }

  function _cacheBoards () {
    return Restangular.all('boards')
      .getList()
      .then(_storeBoards)
      .catch(_logError);
  }

  function _cacheCurrentUserBoards() {
    return Restangular.all('boards')
      .getList({currentUser: true})
      .then(_storeCurrentUserBoards)
      .catch(_logError);
  }

  function _addBoard(response) {
    _boards.push(response);
    return response;
  }

  BoardService.refreshCache = function () {
    return _cacheBoards();
  };

  BoardService.all = function () {
    if (_.isEmpty(_boards)) {
      return _cacheBoards();
    } else {
      return Promise.resolve(_boards);
    }
  };

  function _findBoard(searchKey) {
    return function(response) {
      var found = _.find(_boards, {id: parseInt(searchKey)});
      // Throw an error for your bad path!
      if (!found) throw new Error('Board not cached!!');
      return found;
    };
  }

  BoardService.one = function (searchId) {
    if (_.isEmpty(_boards)) {
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
      .then(_addBoard);
  };

  BoardService.destroy = function(board) {
    return function (response) {
      return _.remove(_boards,{id: board.id});
    };
  };

  return BoardService;

}]);

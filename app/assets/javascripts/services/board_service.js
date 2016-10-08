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
    return _boards.push(response);
  }

  BoardService.refreshCache = function () {
    return _cacheBoards();
  };

  BoardService.all = function () {
    if (_.isEmpty(_boards)) {
      return _cacheBoards();
    } else {
      return Promise.try(_boards);
    }
  };

  BoardService.one = function (searchId) {
    if (_.isEmpty(_boards)) {
      return _cacheBoards()
        .then(function(response) {
          return _.find(_boards, {id: parseInt(searchId)});
        });
    } else {
      return _.find(_boards, {id: parseInt(searchId)});
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

  // BoardService.currentUserBoards = function () {
  //   if (_.isEmpty(_currentUserBoards)) {
  //     return _cacheCurrentUserBoards();
  //   } else {
  //     return Promise.try_currentUserBoards;
  //   }
  // };

  return BoardService;

}]);

app.factory('BoardService',
['Restangular', '_', function(Restangular,_) {

  var BoardService = {};
  var _boards = [];
  var _board = {};

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  function _storeBoards (response) {
    return angular.copy(response, _boards);
  }

  function _storeBoard (response) {
    return angular.copy(response, _board);
  }

  function _cacheBoards () {
    return Restangular.all('boards')
      .getList()
      .then(_storeBoards)
      .catch(_logError);
  }

  function _cacheBoard(id) {
    return Restangular.one('boards', id)
      .get()
      .then(_storeBoard)
      .catch(_logError);
  }

  BoardService.refreshCache = function () {
    return _cacheBoards();
  };

  BoardService.all = function () {
    if (_.isEmpty(_boards)) {
      return _cacheBoards();
    } else {
      return _boards;
    }
  };

  BoardService.one = function (id) {
    if (_.isEmpty(_board)) {
      return _cacheBoard(id);
    } else {
      return _board;
    }
  };

  BoardService.create = function (formParams) {
    return Restangular.all('boards')
      .post({board: formParams });
  };

  return BoardService;

}]);

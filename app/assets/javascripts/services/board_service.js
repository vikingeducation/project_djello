app.factory('BoardService',
['Restangular', '_', function(Restangular,_) {

  var BoardService = {};
  var _boards = [];

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  function _storeBoards (response) {
    return angular.copy(response, _boards);
  }

  function _cacheBoards () {
    return Restangular.all('boards')
      .getList()
      .then(_storeBoards)
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
    if (_.isEmpty(_boards)) {
      return Restangular.one('boards', id);
    } else {
      return _.find(_boards, {id: id});
    }
  };

  BoardService.create = function (formParams) {
    return Restangular.all('boards')
      .post({board: formParams });
  };

  return BoardService;

}]);

app.factory('ListService',
['Restangular', '_', function(Restangular, _) {

  var ListService = {};
  var _boardLists = {};

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  function _storeLists (response) {
    if (!_boardLists[response[0].board_id]) {
      _boardLists[response[0].board_id] = [];
    }
    return angular.copy(
      response,
      _boardLists[response[0].board_id]
    );
  }

  // Make sure Rails API sends back the list object after creation.
  function _addList (response) {
    if (_boardLists[response.board_id]) {
      _boardLists[response.board_id].push(response);
    } else {
      _boardLists[response.board_id] = [];
      _boardLists[response.board_id].push(response);
    }
    console.log(_boardLists);
  }

  function _removeList (response) {
    _.remove(_boardLists[respone.board_id], function(list) {
      return list.id === response.id;
    });
  }

  function _cacheLists (id) {
    return Restangular.all('lists')
      .getList({board_id: id})
      .then(_storeLists)
      .catch(_logError);
  }

  // Have a ListService take care of grabbing lists for a board.
  ListService.create = function (listParams) {
    return Restangular.all('lists')
      .post({list: listParams})
      .then(_addList)
      .catch(_logError);
  };

  ListService.all = function (board_id) {
    if (_.isEmpty(_boardLists[board_id])) {
      return _cacheLists(board_id);
    } else {
      return _boardLists[board_id];
    }
  };

  return ListService;

}]);

app.factory('ListService',
['Restangular', '_', function() {

  var ListService = {};
  var _boardLists = {};

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  // Make sure Rails API sends back the list object after creation.
  function _addList (response) {
    if (_boardLists[response.board_id]) {
      _boardLists[response.board_id].push(response);
    } else {
      _boardLists[response.board_id] = [];
      _boardLists[response.board_id].push(response);
    }
  }

  function _removeList (response) {
    _.remove(_boardLists[respone.board_id], function(list) {
      return list.id === response.id;
    });
  }

  // Have a ListService take care of grabbing lists for a board.
  ListService.create = function (listParams) {
    return Restangular.all('lists')
      .post({list: listParams})
      .then(_addList);
  };

}]);

app.factory('CardService',
['Restangular', '_', function(Restangular,_) {

  var CardService = {};
  var _listCards = {};

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  function _storeCards (list_id) {
    return function (response) {
      if (!_listCards[list_id]) {
        _listCards[list_id] = [];
      }
      angular.copy(
        response,
        _listCards[list_id]
      );
      return _listCards;
    };
  }

  function _cacheCards (list_id) {
    return Restangular.all('cards')
        .getList({list_id: list_id})
        .then(_storeCards(list_id))
        .catch(_logError);
  }

  // Public interface for board's lists.
  CardService.all = function (list_id) {
    if (_.isEmpty(_listCards[list_id])) {
      return _cacheCards(list_id);
    } else {
      return Promise.resolve(_listCards);
    }
  };

  return CardService;

}]);

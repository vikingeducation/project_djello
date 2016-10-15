app.factory('CardService',
['Restangular', '_', function(Restangular,_) {
    
  var CardService = {};
  var _listCardsCache = {};

  function _logError (reason) {
    console.log('ERROR!!! Reason: ');
    console.log(reason);
  }

  function _storeCards (list_id) {
    return function (response) {
      if (!_listCardsCache[list_id]) {
        _listCardsCache[list_id] = [];
      }
      angular.copy(
        response,
        _listCardsCache[list_id]
      );
      return _listCardsCache;
    };
  }

  // Make sure Rails API sends back the list object after creation.
  function _addCard (response) {
    if (!_.isEmpty(_listCardsCache[response.list_id])) {
      _listCardsCache[response.list_id].push(response);
    } else {
      _listCardsCache[response.list_id] = [];
      _listCardsCache[response.list_id].push(response);
    }
    return _listCardsCache;
  }

  function _updateCard (response) {
    var cards = _listCardsCache[response.list_id];
    var found = _.find(cards, {id: response.id});
    if (!found) throw new Error ('Nothing to update!');
    angular.copy(response, found);
    return found;
  }

  function _cacheCards (list_id) {
    return Restangular.all('cards')
        .getList({list_id: list_id})
        .then(_storeCards(list_id))
        .catch(_logError);
  }

  // Public interface for board's lists.
  CardService.all = function (list_id) {
    if (_.isEmpty(_listCardsCache[list_id])) {
      return _cacheCards(list_id);
    } else {
      return Promise.resolve(_listCardsCache);
    }
  };

  CardService.create = function (cardParams) {
    return Restangular.all('cards')
      .post({card: cardParams})
      .then(_addCard)
      .catch(_logError);
  };

  CardService.update = function (cardParams) {
    return Restangular.one('cards', cardParams.id)
      .patch({card: cardParams})
      .then(_updateCard)
      .catch(_logError);
  };

  return CardService;

}]);

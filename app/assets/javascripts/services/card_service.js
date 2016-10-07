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
      console.log(_listCards);
      return _listCards;
    };
  }

  // Make sure Rails API sends back the list object after creation.
  function _addCard (response) {
    if (!_.isEmpty(_listCards[response.list_id])) {
      _listCards[response.list_id].push(response);
    } else {
      _listCards[response.list_id] = [];
      _listCards[response.list_id].push(response);
    }
    return _listCards[response.list_id];
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

  CardService.create = function (formData) {
    return Restangular.all('cards')
      .post({card: formData})
      .then(_addCard)
      .catch(_logError);
  };

  return CardService;

}]);

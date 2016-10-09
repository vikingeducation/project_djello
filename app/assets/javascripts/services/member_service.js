app.factory('MemberService',
['Restangular', function(Restangular) {

  var MemberService = {};
  var _membersCache = {};

  function _storeMembers (card_id) {
    return function (response) {
      if (!_membersCache[card_id]) {
        _membersCache[card_id] = [];
      }
      angular.copy(response,_membersCache[card_id]);
      return _membersCache;
    };
  }

  function _addMember (card_id) {
    return function (response) {
      if (!_.isEmpty(_membersCache[card_id])) {
        _membersCache[card_id].push(response);
      } else {
        _membersCache[card_id] = [];
        _membersCache[card_id].push(response);
      }
      return _membersCache;
    };
  }

  function _cacheMembers (id) {
    return Restangular.all('members')
      .getList({card_id: id})
      .then(_storeMembers(id))
      .catch(_logError);
  }

  MemberService.addMember = function (memberParams, card_id) {
    return Restangular.all('members')
      .post(memberParams)
      .then(_addMember(card_id))
      .catch(_logError);
  };

  MemberService.all = function (card_id) {
    if (_.isEmpty(_membersCache[card_id])) {
      return _cacheMembers(card_id);
    } else {
      return Promise.resolve(_membersCache);
    }
  };

  return MemberService;

}]);

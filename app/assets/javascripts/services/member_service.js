app.factory('MemberService',
['Restangular', function(Restangular) {

  var MemberService = {};
  var _membersCache = {};

  function _logError (reason) {
    console.log('ERROR!! Reason: ');
    console.log(reason);
  }

  function _storeMembers (parent_id, parent_type) {
    return function (response) {
      if (!_membersCache[parent_type]) {
        _membersCache[parent_type] = {};
      }
      if (!_membersCache[parent_type][parent_id]) {
        _membersCache[parent_type][parent_id] = [];
      }
      angular.copy(response,_membersCache[parent_type][parent_id]);
      return _membersCache;
    };
  }

  function _addMember (parent_id, parentType) {
    return function (response) {
      if (_.isEmpty(_membersCache[parentType])) {
        _membersCache[parentType] = {};
      }
      if (_.isEmpty(_membersCache[parentType][parent_id])) {
        _membersCache[parentType][parent_id] = [];
      }
      _membersCache[parentType][parent_id].push(response);
      return _membersCache;
    };
  }

  function _cacheMembers (parent_id, parent_type) {
    return Restangular.all('members')
      .getList({parent_id: parent_id, parent_type: parent_type})
      .then(_storeMembers(parent_id, parent_type))
      .catch(_logError);
  }

  MemberService.create = function (memberParams) {
    return Restangular.all('members')
      .post({member: memberParams})
      .then(_addMember(memberParams.parent_id, memberParams.parent_type))
      .catch(_logError);
  };

  MemberService.all = function (parent_id, parent_type) {
    if (!_.isEmpty(_membersCache[parent_type])) {
      if (!_.isEmpty(_membersCache[parent_type][parent_id])) {
        return Promise.resolve(_membersCache);
      }
    }
    return _cacheMembers(parent_id, parent_type);
  };

  return MemberService;

}]);

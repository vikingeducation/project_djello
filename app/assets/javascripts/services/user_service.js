app.factory('UserService',
['Restangular', function (Restangular) {

  var UserService = {};
  var _usersCache = [];

  var _typeaheadOptions = {
    hint: true,
    highlight: true,
    minLength: 1
  };

  function _ttDataset (collection) {
    return {
      name: 'users-dataset',
      source: collection,
    };
  }

  // Initializing Bloodhound instance.
  function _buildEngine (collection) {
    return new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: collection
    });
  }

  function _logError (reason) {
    console.log('ERROR!! Reason: ');
    console.log(reason);
  }

  function _storeUsers (response) {
    return angular.copy(response,_usersCache);
  }

  function _cacheUsers () {
    return Restangular.all('users')
      .getList()
      .then(_storeUsers)
      .catch(_logError);
  }

  UserService.all = function() {
    if (_.isEmpty(_usersCache)) {
      return _cacheUsers();
    } else {
      return Promise.resolve(_usersCache);
    }
  };

  // Setting up typeahead.
  UserService.ttSetup = function (collection, element) {
    return element.typeahead(
      _typeaheadOptions,
      _ttDataset(_buildEngine(collection))
    );
  };

  return UserService;

}]);

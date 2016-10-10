app.factory('UserService',
['Restangular', function (Restangular) {

  var UserService = {};
  var _usersCache = [];
  var _suggestion = {
    data: ''
  };

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
  function _buildEngine (collection, searchKey) {
    // Scrub the data collection.
    var db = _.map(collection, function(item) {
      return item[searchKey];
    });
    return new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: db
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

  UserService.updateSuggestion = function(suggestion) {
    _suggestion.data = suggestion;
  };

  // Setting up typeahead.
  UserService.ttSetup = function (collection, element, searchKey) {
    return element.typeahead(
      _typeaheadOptions,
      _ttDataset(_buildEngine(collection, searchKey))
    );
  };

  UserService.getSuggestion = function () {
    return _suggestion.data;
  };

  return UserService;

}]);

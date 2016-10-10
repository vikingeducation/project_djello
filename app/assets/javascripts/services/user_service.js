app.factory('UserService',
['Restangular', function (Restangular) {

  var UserService = {};
  var _usersData = {
    cache: [],
    status: 'success',
    type: 'users'
  };
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

  function _errorStatus (response) {
    switch (response.status) {
      case -1:
        _data.status = 'timeout';
        break;
    }
    return _data;
  }

  function _storeUsers (response) {
    angular.copy(response,_usersData.cache);
    return _usersData;
  }

  function _cacheUsers () {
    return Restangular.all('users')
      .getList()
      .catch(_logError)
      .then(_storeUsers,_errorStatus);
  }

  UserService.all = function() {
    if (_.isEmpty(_usersData.cache)) {
      return _cacheUsers();
    } else {
      return Promise.resolve(_usersData);
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

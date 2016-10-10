app.directive('notification', function () {

  return {
    restrict: 'A',
    scope: {
      noticeData: '='
    },
    link: function(scope, element) {
      switch (scope.noticeData.status) {
        case 'success':
          element.text('Success!! (' + scope.noticeData.type + ")");
          element.addClass('alert alert-success');
          break;
        case 'failure':
          element.text('Failed.. (' + scope.noticeData.type + ")");
          element.addClass('alert alert-danger');
          break;
        case 'timeout':
          element.text('Timed out. (' + scope.noticeData.type + ")");
          element.addClass('alert alert-warning');
          break;
      }
    }
  };

});

app.directive('notification', function () {

  return {
    restrict: 'A',
    scope: {
      boardsData: '='
    },
    link: function(scope, element) {
      switch (scope.boardsData.status) {
        case 'success':
          element.text('Success!!');
          break;
      }
    }
  };

});

app.directive('boardMembersModal', function () {

  return {
    templateUrl: 'templates/directives/board_members_modal.html',
    restrict: 'E',
    scope: true,
    link: function (scope, element) {
      scope.parentType = 'board';
      scope.search = {
        key: 'username'
      };
    }
  };

});

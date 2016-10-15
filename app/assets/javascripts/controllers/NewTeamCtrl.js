app.controller("NewTeamCtrl", ["$scope", "usersService", "teamsService", "$state", function($scope, usersService, teamsService, $state) {

  usersService.getAllUsers().then(function(response) {
    $scope.users = response
    console.log(response)
  })

  $scope.selectedUsers = {}

  var convertToEmailsArray = function(usersObj) {
    var emails = []
    for (var email in usersObj) {
      if (usersObj[email]) {
        emails.push(email)
      }
    }
    return emails
  }


  $scope.createTeam = function(name, selectedUsers) {
    var emailsArr = convertToEmailsArray(selectedUsers)
    teamsService.createTeam(name, emailsArr)
      .then(function(response) {
        if (response) {
          $state.go('boardsIndex')
        }
      });
  }

}])
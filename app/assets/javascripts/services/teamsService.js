app.factory("teamsService", ["Restangular", "Auth", function(Restangular, Auth) {
  var teamsService = {}

  teamsService.getUserTeams = function(user) {
    return Restangular.one("users", user.id).all("teams").getList().then(function(response) {
      console.log(response)
      return response
    })
  }

  teamsService.getTeamByBoard = function(board) {
    var user = Auth.currentUser()
    return Restangular.one('boards', board.id).one('teams', board.team_id).get().then(function(response) {
      return response
    })
  }

  return teamsService
}])
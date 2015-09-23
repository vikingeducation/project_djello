djello.directive('navbarMain', function(){
  return {
    templateUrl: "/directives/navbar.html",
    restrict: "A",
    scope: {
      currentUser: "=user"
    },
    controller: "navbarCtrl"
  }
})
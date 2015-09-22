djello.directive('navbarMain', function(){
  return {
    templateUrl: "/directives/navbar.html",
    restrict: "A",
    scope: true,
    controller: "navbarCtrl"
  }
})
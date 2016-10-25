app.directive('loading',   ['$http' ,function ($http){
  return {
      templateUrl: "/templates/directives/loading.html",
      restrict: "E",
      link: function (scope, elm, attrs)
      {
          scope.isLoading = function () {
              return $http.pendingRequests.length > 0;
          };

          scope.$watch(scope.isLoading, function(v){
              $loading = $('#loading');
              if(v){
                  $loading.show();
              }else{
                  $loading.hide();
              }
          });
      }
  };

}]);
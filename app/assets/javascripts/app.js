var app = angular.module('djello', ['ui.router', 'restangular'])

.config(['RestangularProvider', function(RestangularProvider){
	RestangularProvider.setBaseUrl('/api/v1');
	RestangularProvider.setRequestSuffix('.json');
}])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$stateProvider
		
		.state('boards',{
			url: '/boards',
			templateUrl: '/templates/boards/layout.html',
		})

		.state('boards.index',{
			url: '/index',
			templateUrl: 'templates/boards/index.html',
			controller: 'BoardsIndexCtrl',
			resolve: {
				boards: ['Restangular', function(Restangular){
					return Restangular.all('boards').getList().$object;
				}]
			}
		})

		.state('boards.show',{
			url: '/show/:id',
			templateUrl: 'templates/boards/show.html',
			controller: 'BoardsShowCtrl',
			resolve: {
				board: ['Restangular', '$stateParams',
					function(Restangular, $stateParams){
						return Restangular.one('boards', $stateParams.id).get();
				}]
			}
		})

	$urlRouterProvider.otherwise('/boards');
}])

.run(function($rootScope){
	$rootScope.$on("$stateChangeError", console.log.bind(console));
});
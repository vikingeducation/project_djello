var app = angular.module('djello', ['ui.router', 'restangular', 'textAngular'])

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
				}],
				lists: ['Restangular', '$stateParams',
					function(Restangular, $stateParams){
						return Restangular.all('lists').getList({board_id: $stateParams.id});
				}],
				cards: ['Restangular', '$stateParams',
					function(Restangular, $stateParams){
						return Restangular.all('cards').getList({board_id: $stateParams.id});
				}]
			}
		})

		.state('boards.list',{
			url: '/show/:id/list',
			templateUrl: 'templates/lists/layout.html',
			controller: 'ListsCtrl',
		})

		.state('boards.list.new',{
			url: '/new',
			templateUrl: 'templates/lists/_new.html',
			controller: 'ListsNewCtrl',
		})

		.state('boards.card',{
			url: '/show/:id/list/:list_id/card',
			templateUrl: 'templates/cards/layout.html',
			controller: 'CardCtrl'
		})

		.state('boards.card.new',{
			url: '/new',
			templateUrl: 'templates/cards/new.html',
			controller: 'CardNewCtrl'
		})

		.state('boards.card.show',{
			url: '/show/:card_id',
			templateUrl: 'templates/cards/show.html',
			controller: 'CardShowCtrl',
			resolve: {
				board: ['Restangular', '$stateParams',
					function(Restangular, $stateParams){
						return Restangular.one('boards', $stateParams.id).get();
				}],
				list: ['Restangular', '$stateParams',
					function(Restangular, $stateParams){
						return Restangular.one('lists', $stateParams.list_id).get();
				}],
				card: ['Restangular', '$stateParams',
					function(Restangular, $stateParams){
						return Restangular.one('cards', $stateParams.card_id).get();
				}]
			}
		})

	$urlRouterProvider.otherwise('/boards/index');
}])

.run(function($rootScope){
	$rootScope.$on("$stateChangeError", console.log.bind(console));
});
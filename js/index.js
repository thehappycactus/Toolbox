(function() {
	'use strict';

	angular
		.module('DCToolbox', ['ngRoute', 'ngResource'])
		.config(['$routeProvider', '$locationProvider', AppConfig]);

	function AppConfig($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/dashboard.html',
			})
			.when('/template', {
				templateUrl: 'views/template-maker.html'
			})
			.when('/matrix', {
				templateUrl: 'views/test-matrix.html'
			});
	}

})();

var app = angular.module('app', ['ngResource', 'ngRoute', 'angularFileUpload']).value('toastr', toastr);

app.config(function ($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);

	var routeUserChecks = {
		adminRole: {
			authenticate: function(auth) {
				return auth.isAuthorizedForRole('admin');
			}
		},
		authenticated: {
			authenticate: function(auth) {
				return auth.isAuthenticated();
			}
		}
	};

	$routeProvider
		.when('/', {
			templateUrl: '/partials/main/home',
			controller: 'MainCtrl'
		})
		.when('/charts', {
			templateUrl: '/partials/charts/charts',
			controller: 'ChartsCtrl'
		})		
		.when('/admin/charts', {
			templateUrl: '/partials/charts/charts-manage',
			controller: 'ChartsManageCtrl',
			resolve: routeUserChecks.adminRole
		})		
		.when('/admin/addUser', {
			templateUrl: '/partials/admin/addUser',
			controller: 'AddUserCtrl',
			resolve: routeUserChecks.authenticated
		})
		.when('/account/profile', {
			templateUrl: '/partials/account/profile',
			controller: 'ProfileCtrl',
			resolve: routeUserChecks.authenticated
		})
		.when('/admin/users', {
			templateUrl: '/partials/admin/users-list',
			controller: 'UserListCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/server/upload', {			
			resolve: routeUserChecks.adminRole
		})
		.when('/server/download', {			
			resolve: routeUserChecks.adminRole
		});
});

app.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
		if(rejection === "not authorized") {
			$location.path('/');
		}
	})
});
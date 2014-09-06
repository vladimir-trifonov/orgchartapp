app.controller('UserListCtrl', function($scope, $rootScope, UsersResource, Helper) {
	Helper.afterInit(false);

	$scope.users = UsersResource.query();
});
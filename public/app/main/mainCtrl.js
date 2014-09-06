"use strict";

app.controller('MainCtrl', function ($scope, $rootScope, Helper) {
	$scope.releases = [
		{ name: "Alpha Release", text: "ver.0.0.1", date: new Date("June 1, 2014") }
	];

	Helper.afterInit(false);
});
app.controller('CoursesListCtrl', function($scope, CachedCharts) {
	$scope.charts = CachedCharts.query();		
});
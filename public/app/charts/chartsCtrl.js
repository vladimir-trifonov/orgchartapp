app.controller('ChartsCtrl', function($scope, $rootScope, ChartResource, Helper) {
	Helper.afterInit(true);	

    $scope.chart = ChartResource.query().$promise.then(function(collection) {
    	collection.forEach(function(root) {    			
			$(".chart-wrapper").orgChart({
		        "hideParent": false,
		        "root": root
		    })
		})
	});	
});
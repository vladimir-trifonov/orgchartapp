app.factory("ChartResource", function($resource) {  
	var ChartResource = $resource('/api/charts/:id', {_id: '@id'});    
	return ChartResource;
});
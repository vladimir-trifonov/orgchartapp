app.factory("CachedCharts", function(ChartResource) {
	var cachedCharts;

	return {
		query: function() {
			if (!cachedCharts) {
				cachedCharts = ChartResource.query();
			}
			return cachedCharts;
		}
	}
});
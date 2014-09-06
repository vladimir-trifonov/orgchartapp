app.service('Helper', function($rootScope) {
    this.afterInit = function(isHidden) {
        $rootScope.headerHide = isHidden;
		$rootScope.footerHide = isHidden;

		if(!isHidden) {
			$('body').removeAttr("style");
			$('.chart-wrapper').removeAttr("style");
		} else {
			$('body').css("padding-top", "10px");
			$('.chart-wrapper').css("padding-bottom", "48.5%");
		}		
    }
});


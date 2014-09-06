app.factory('notifier', function () {
	return {
		success: function (msg) {
			toastr.success(msg);
		},
		error: function(msg) {
			toastr.error(msg);
		}
	}
})
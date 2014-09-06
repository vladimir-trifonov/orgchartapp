var Chart = require('mongoose').model('Chart');
module.exports = {
	getChartById: function(req, res, next) {
		Chart.findOne({_id: req.params.id}).exec(function(err, chart) {
			if(err) {
				console.log("Chart could not be loaded:" + err);
			}

			res.send(chart);
		})
	},
	getAllCharts: function(req, res, next) {
		Chart.find({}).exec(function(err, collection) {
			if(err) {
				console.log("Charts could not be loaded:" + err);
			}

			res.send(collection);
		})
	},
	setLog: function(req, res, next) {
		Chart.findOne({}).exec(function(err, chart) {
			if(err) {
				console.log("Chart log could not be updated:" + err);
			}

			chart.updatedAt = new Date();
			chart.updatedBy = req.user.firstName + " " + req.user.lastName;

			chart.save();
		})
	}
};
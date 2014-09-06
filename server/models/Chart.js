var mongoose = require('mongoose');
    
var chartSchema = mongoose.Schema({
    _id: Number,
    title: String,
    updatedAt: Date,
    updatedBy: String,
    isPublic: Boolean
});
var Chart = mongoose.model('Chart', chartSchema);
module.exports.seedInitialCharts = function() {
    Chart.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find charts: ' + err);
        }
        
        //Chart.remove({}, function() {
            if (collection.length === 0) {
                var chart = new Chart({
                    _id: 1,
                    title: 'Org Chart',
                    updatedAt: new Date(),
                    updatedBy: "admin",
                    isPublic: true
                });
                chart.save(function(err, chart) {
                    if (err) return console.error(err);                    
                });
            };
        //});
    });
};
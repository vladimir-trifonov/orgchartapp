var Node = require('mongoose').model('Node'),
	node = require('../models/Node'),
	file = require('./filesController'),
    path = require('path');

module.exports = {
	getAllNodes: function(req, res, next) {
		Node.find({}).exec(function(err, collection) {
			if(err) {
				console.log("Nodes could not be loaded:" + err);
			}

			res.send(collection);
		})
	},
	updateNode: function(req, res, next) {
		if(req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
			node.seedInitialNodes(true, req.files.file.path).then(function () {				
				res.send({success: true, reason: "success", msg: 'Success!'});
				next();				
			}, function(){
				res.send({success: false, reason: "error", msg: 'File Parse Error!'});				
			})
			.done(function() {				
				file.deleteFile(req.files.file.path);				
			});
		} else {
			res.send({reason: "permissions", msg: 'No permissions!'});			
		}
	},
	cacheNodes: function() {
		Node.find({}).exec(function(err, collection) {
			if(err) {
				console.log("Nodes could not be loaded:" + err);
			}

			var cacheFilePath = file.getDataCachedFilePath();
			file.writeFile(cacheFilePath, JSON.stringify(collection));
		})
	}
};
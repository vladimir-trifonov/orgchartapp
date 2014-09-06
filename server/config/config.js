var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/orgchartdevelopment',
		port: process.env.PORT || 88
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://localhost/orgchartproduction',
		port: process.env.PORT || 88
	},
	management: {
		rootPath: rootPath,
		db: 'mongodb://localhost/orgchartmanagement',
		port: process.env.PORT || 89
	},
	rootPath: rootPath
}
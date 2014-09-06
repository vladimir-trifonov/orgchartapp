var usersController = require('../controllers/usersController'),	
	chartsController = require('../controllers/chartsController'),
	nodesController = require('../controllers/nodesController'),
	filesController = require('../controllers/filesController');

module.exports = {
	users: usersController,	
	charts: chartsController,
	nodes: nodesController,
	files: filesController
}
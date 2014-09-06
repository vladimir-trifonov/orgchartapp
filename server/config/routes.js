var auth = require('./auth'),
	multipart = require('connect-multiparty'),
	controllers = require("../controllers");

var multipartMiddleware = multipart();
module.exports = function(app) {
	app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
	app.post('/api/users', controllers.users.createUser);
	app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

	app.get('/api/charts', controllers.nodes.getAllNodes);	
	app.get('/api/charts/:id', auth.isAuthenticated, controllers.charts.getChartById);

	app.get('/partials/:partialArea/:partialName', function(req, res) {
		res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName);
	});

	app.post('/login', auth.login);
	app.post('/logout', auth.logout);

	app.post('/server/upload', auth.isInRole('admin'), multipartMiddleware, controllers.nodes.updateNode, controllers.charts.setLog);
	app.get('/server/download', auth.isInRole('admin'), controllers.files.downloadDataCachedFile);

	app.get('/api/*', function(req, res) {
		res.status(404);
		res.end();
	});

	app.get('*', function(req, res) {
		res.render('index', {
			currentUser: req.user
		});
	});
};
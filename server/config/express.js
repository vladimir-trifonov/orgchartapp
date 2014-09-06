var express = require('express'),	
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	//RedisStore = require('connect-redis')(session),
	MongoStore = require('connect-mongo')(session);
	passport = require('passport');

module.exports = function(app, config) {
	app.set('view engine', 'jade');
	app.set('views', config.rootPath + '/server/views');
	app.use(cookieParser());
	app.use(bodyParser());
	//app.use(session({secret: 'gergenymntyuy45by4ERGH#qa45v'}));	
	app.use(session({
		store: new MongoStore({
			url: config.db
		}), 
		secret: 'gergenymntyuy45by4ERGH#qa45v', 
		cookie: {
			secure: false,
			maxAge: 86400000
		}
	}));	
	//app.use(session({ store: new RedisStore({host:'127.0.0.1', port:6380, prefix:'chs-sess'}), secret: 'gergenymntyuy45by4ERGH#qa45v' }));
	app.use(passport.initialize());
	app.use(passport.session());	
	app.use(express.static(config.rootPath + '/public'));	
}
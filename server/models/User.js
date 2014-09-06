var mongoose = require('mongoose'),
	encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
	username: { type: String, require: '{PATH} is required', unique: true},
	firstName: { type: String, require: '{PATH} is required'},
	lastName: { type: String, require: '{PATH} is required'},
	salt: String,
	hashPass: String,
	roles: [String]
});

userSchema.method({
	authenticate: function(password) {
		if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
			return true;
		} else {
			return false;
		}
	}
})

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
	User.find({}).exec(function(err, collection) {
		if (err) {
			console.log('Cannot find users: ' + err);
		}

		//User.remove({}, function () {
		if (collection.length === 0) {
			var salt;
			var hashedPassword;

			salt = encryption.generateSalt();
			hashedPassword = encryption.generateHashedPassword(salt, "admin");
			User.create({
				username: 'admin',
				firstName: "root",
				lastName: "admin",
				salt: salt,
				hashPass: hashedPassword,
				roles: ['admin']
			});
			salt = encryption.generateSalt();
			hashedPassword = encryption.generateHashedPassword(salt, "guest");
			User.create({
				username: 'guest',
				firstName: "anonimous",
				lastName: "guest",
				salt: salt,
				hashPass: hashedPassword,
				roles: ['standard']
			});		
			console.log("Users added to db!");
		}
		//});
	});
}
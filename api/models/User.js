var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	googleId: String,
	displayName: String,
	facebookId: String,
	active: Boolean
});


UserSchema.methods.toJSON = function() {
	var user = this.toObject();
	delete user.password;
	return user;
};

UserSchema.methods.comparePasswords = function(password, callback) {
	bcrypt.compare(password, this.password, callback);
};

//this is a middle-ware to hash password
UserSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) return next(err);

			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User', UserSchema);

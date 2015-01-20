var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
		email: {
			type: 'string',
			required: true,
			unique: true
		},
		password: {
			type: 'string',
			required: true
		}
  },
	beforeCreate: function(values, next) {
		var pass = values.password;

		bcrypt.genSalt(10, function(err, salt) {
			if(err) return next(err);

			bcrypt.hash(pass, salt, null, function(err, hash) {
				if(err) return next(err);

				values.password = hash;
				next();
			});
		});
	}
};


var jwt = require('jwt-simple');

module.exports = {

	/*
	 * |-------------------------------------------------------------------------- |
	 * Generate JSON Web Token
	 * |--------------------------------------------------------------------------
	 */
	createToken : function() {
		var payload = {
			exp : moment().add(14, 'days').unix(),
			iat : moment().unix(),
			sub : user._id
		};
		return jwt.encode(payload, config.tokenSecret);
	},

	/**
	 * Validate token
	 * 
	 * @param req
	 * @param res
	 * @param next
	 */
	validateToken : function(token) {
		var payload = jwt.decode(token, config.tokenSecret);
		var now = moment().unix();
		if (now > payload.exp) {
			return res.status(401).send({
				message : 'Token has expired.'
			});
		}
		User.findById(payload.sub, function(err, user) {
			if (!user) {
				return res.status(400).send({
					message : 'User no longer exists.'
				});
			}

			req.user = user;
			next();
		})
	}

}
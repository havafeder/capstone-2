const jwt = require('jsonwebtoken');
require("dotenv").config();

function jwtCreator(user_id) {
	const payload = {
		user: {
			id: user_id
		}
	};

	return jwt.sign(payload, `${process.env.JWT_KEY}`, { expiresIn: "1hr" });
}

module.exports = jwtCreator;

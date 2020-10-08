const jwt = require('jsonwebtoken');
const isAuth = (req, res, next) => {
	jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			next();
		}
	});
};

const isAuthHeader = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];
	jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			next();
		}
	});
};

module.exports = {
	isAuth: isAuth,
	isAuthHeader: isAuthHeader
};

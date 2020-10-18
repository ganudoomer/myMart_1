const jwt = require('jsonwebtoken');

const isAuthDealer = (req, res, next) => {
	jwt.verify(req.body.token, process.env.DEALER_SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			next();
		}
	});
};

const isAuthHeaderDealer = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];
	jwt.verify(bearerToken, process.env.DEALER_SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			next();
		}
	});
};

const isAuthAdmin = (req, res, next) => {
	jwt.verify(req.body.token, process.env.ADMIN_SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			next();
		}
	});
};

const isAuthHeaderAdmin = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];
	jwt.verify(bearerToken, process.env.ADMIN_SECRET, (err, decoded) => {
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
	isAuthAdmin,
	isAuthDealer,
	isAuthHeaderDealer,
	isAuthHeaderAdmin
};

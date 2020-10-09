const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;
const Admin = require('../mongodb/Admin');

module.exports.login = (req, res) => {
	if (req.body.username === 'admin' && req.body.password === 'admin') {
		const token = jwt.sign(
			{
				data: 'admin'
			},
			process.env.ADMIN_SECRET,
			{ expiresIn: 60 * 1600 }
		);
		res.json({ token });
	} else {
		res.sendStatus(401);
	}
};

module.exports.checkAuth = (req, res) => {
	jwt.verify(req.body.token, process.env.ADMIN_SECRET, (err, decoded) => {
		if (err) {
			res.sendStatus(401);
		} else {
			res.sendStatus(200);
		}
	});
};

module.exports.getAllDealer = async (req, res) => {
	Admin.getAllDealer()
		.then((dealer) => {
			return res.json(dealer);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.getSingleDealer = async (req, res) => {
	Admin.getSingleDealer(req.params.id)
		.then((dealer) => {
			return res.json(dealer);
		})
		.catch((err) => {
			res.sendStatus(200);
			console.log(err);
		});
};

module.exports.createNewDealer = async (req, res) => {
	const hash = await bcrypt.hash(req.body.password, 8);
	const dealer = {
		dealer_name: req.body.dealer_name,
		username: req.body.username,
		phone: req.body.phone,
		email: req.body.email,
		address: req.body.address,
		no_of_orders: 0,
		password: hash,
		products: [],
		live: false,
		color: req.body.color,
		image: { imageName: req.body.image, thumbnail: req.body.thumbnail }
	};
	Admin.addNewDealer(dealer)
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.editDealer = async (req, res) => {
	const filter = { _id: ObjectID(req.params.id) };
	const color = req.body.color;
	const image = req.body.image;
	let updateDoc = {
		$set: {
			dealer_name: req.body.dealer_name,
			username: req.body.username,
			phone: req.body.phone,
			email: req.body.email,
			address: req.body.address,
			color: color,
			image: image,
			no_of_orders: 0
		}
	};
	if (req.body.password) {
		const hash = await bcrypt.hash(req.body.password, 8);
		updateDoc = {
			$set: {
				dealer_name: req.body.dealer_name,
				username: req.body.username,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
				no_of_orders: 0,
				color: req.body.color,
				image: image,
				password: hash
			}
		};
	}
	const options = { upsert: false };
	Admin.editDealer(filter, updateDoc, options)
		.then(() => {
			return res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.deleteDelaer = async (req, res) => {
	console.log('delete');
	const query = { _id: ObjectID(req.params.id) };
	Admin.deleteDealer(query)
		.then(() => {
			return res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.getUnit = async (req, res) => {
	Admin.getUnit()
		.then((units) => {
			res.json(units);
		})
		.catch((err) => {
			console(err);
		});
};

module.exports.addUnit = async (req, res) => {
	Admin.addUnit(req.body.unit)
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
		});
};

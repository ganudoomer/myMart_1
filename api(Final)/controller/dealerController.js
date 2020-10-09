const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const { upload } = require('../common/multer.config');
const Dealer = require('../mongodb/Dealer');

module.exports.loginDealer = async (req, res) => {
	const password = req.body.password;
	const username = req.body.username;
	Dealer.find(username).then((result) => {
		if (result) {
			bcrypt.compare(password, result.password).then((ress) => {
				if (ress) {
					const token = jwt.sign(
						{
							username: result.username,
							id: result._id,
							dealer: result.dealer_name
						},
						process.env.DEALER_SECRET,
						{ expiresIn: 60 * 1600 }
					);
					return res.json({ token });
				} else {
					return res.sendStatus(401);
				}
			});
		} else {
			return res.sendStatus(401);
		}
	});
};

module.exports.dealerAuth = (req, res) => {
	jwt.verify(req.body.token, process.env.DEALER_SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			res.sendStatus(200);
		}
	});
};

module.exports.getAllProducts = (req, res) => {
	jwt.verify(req.body.token, process.env.DEALER_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			Dealer.getAllProducts(decoded.username)
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					console(err);
				});
		}
	});
};

module.exports.createProduct = async (req, res) => {
	const product = {
		name: req.body.name,
		_id: ObjectID(),
		title: req.body.title,
		description: req.body.description,
		image: { imageName: req.body.image, thumbnail: req.body.thumbnail },
		price: req.body.price,
		unit: req.body.unit,
		cat: req.body.cat,
		stock: parseInt(req.body.stock)
	};
	jwt.verify(req.body.token, process.env.DEALER_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded + '[POST PRODUCt]');
			Dealer.addProduct(decoded.username, product)
				.then(() => {
					res.sendStatus(200);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
};

module.exports.editProduct = async (req, res) => {
	const filter = { 'products._id': ObjectID(req.params.id) };
	console.log(filter);
	const updateDoc = {
		$set: {
			'products.$.name': req.body.name,
			'products.$.title': req.body.title,
			'products.$.description': req.body.description,
			'products.$.image': req.body.image,
			'products.$.price': req.body.price,
			'products.$.unit': req.body.unit,
			'products.$.cat': req.body.cat,
			'products.$.stock': parseInt(req.body.stock)
		}
	};
	const options = { upsert: false };
	Dealer.editProduct(filter, updateDoc, options)
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console(err);
		});
};

module.exports.deleteProduct = async (req, res) => {
	const bearerHeader = req.headers['authorization'];
	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];
	jwt.verify(bearerToken, process.env.DEALER_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			Dealer.deleteProduct(decoded.username, req.params.id)
				.then(() => {
					res.sendStatus(200);
				})
				.catch((err) => {
					console(err);
				});
		}
	});
};

module.exports.getSingleDealer = (req, res) => {
	const id = req.params.id;
	jwt.verify(req.body.token, process.env.DEALER_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			Dealer.getSingleProduct(decoded.username, id)
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
};

module.exports.getSettings = (req, res) => {
	jwt.verify(req.body.token, process.env.DEALER_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			Dealer.getSettings(decoded.username)
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
};

module.exports.changeSetting = (req, res) => {
	jwt.verify(req.body.token, process.env.DEALER_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			let set = false;
			if (req.body.set === 'true') {
				set = true;
			}
			const updateDoc = { $set: { live: set } };
			const options = { upsert: true };
			Dealer.changeSettings(decoded.username, updateDoc, options)
				.then(() => {
					res.sendStatus(200);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
};

module.exports.getUnits = (req, res) => {
	Dealer.getUnit()
		.then(() => {
			res.json(response);
		})
		.catch((err) => {
			console(err);
		});
};

module.exports.uploadImage = (req, res) => {
	upload(req, res);
};

module.exports.getOrder = (req, res) => {
	jwt.verify(req.body.token, process.env.DEALER_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			Dealer.getOrder(decoded.dealer)
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					console(err);
				});
		}
	});
};

module.exports.editOrderStatus = (req, res) => {
	const status = req.body.status;
	const id = req.body.id;
	const updateDoc = { $set: { status: status } };
	const options = { upsert: false };
	Dealer.editOrderStatus(id, updateDoc, options)
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console(err);
		});
};

module.exports.editItemStatus = (req, res) => {
	const updateDoc = { $set: { 'order.$.reject': true } };
	const options = { upsert: false };
	Dealer.editItemStatus(req.body.id, req.body.orderId, updateDoc, options)
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
		});
};

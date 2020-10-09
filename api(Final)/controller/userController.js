const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const request = require('request');
const bcrypt = require('bcrypt');
const Razorpay = require('razorpay');
const User = require('../mongodb/User');

module.exports.getItems = async (req, res) => {
	const store = req.params.store;
	User.getItems(store)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.getStore = async (req, res) => {
	User.getStore()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.getUserInfo = (req, res) => {
	jwt.verify(req.body.token, process.env.SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.json({ status: 'error', message: 'Error' });
		} else {
			User.getUserInfo(decoded.phone)
				.then((result) => {
					res.send(result);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
};

module.exports.authUser = (req, res) => {
	jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			res.sendStatus(200);
		}
	});
};

module.exports.registerUser = async (req, res) => {
	try {
		const result = await User.getUserInfo(req.body.phone);
		if (!result) {
			const name = req.body.name;
			const location = req.body.location;
			const phone = req.body.phone;
			const password = req.body.password;
			const options = {
				method: 'POST',
				url: 'https://d7networks.com/api/verifier/send',
				headers: {
					Authorization: process.env.D7APIKEY
				},
				formData: {
					mobile: phone,
					sender_id: 'SMSINFO',
					message: 'Your otp code for MyMart register is {code}',
					expiry: '1800'
				}
			};
			request(options, function(error, response) {
				console.log(error);
				if (!error) {
					const data = JSON.parse(response.body);
					console.log(data.otp_id);
					const token = jwt.sign(
						{
							name: name,
							location: location,
							phone: phone,
							otp_id: data.otp_id,
							password: password
						},
						process.env.SECRET,
						{ expiresIn: '600s' }
					);
					console.log(token);
					res.json({ temp: token });
				} else {
					res.json({ status: 'error', message: 'Error while sending otp' });
				}
			});
		} else {
			res.json({ status: 'error', message: 'User already exists ' });
		}
	} catch (err) {
		res.json({ status: 'error', message: 'Server is done  ' });
	}
};

module.exports.registerUserAuth = (req, res) => {
	const otp = req.body.otp;
	console.log(otp);
	jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.json({ status: 'error', message: 'Error' });
		} else {
			console.log(decoded);
			const options = {
				method: 'POST',
				url: 'https://d7networks.com/api/verifier/verify',
				headers: {
					Authorization: process.env.D7APIKEY
				},
				formData: {
					otp_id: decoded.otp_id,
					otp_code: otp
				}
			};
			request(options, async function(error, response) {
				console.log(response.body);
				console.log(error + '[ERROR]');
				if (!error && JSON.parse(response.body).status === 'success') {
					const hash = await bcrypt.hash(decoded.password, 8);
					const user = {
						name: decoded.name,
						phone: decoded.phone,
						location: decoded.location,
						password: hash,
						orders: []
					};
					User.addtUser(user)
						.then(() => {
							res.sendStatus(200);
						})
						.catch((err) => {
							res.sendStatus(501);
						});
				} else {
					res.json({ status: 'error', message: JSON.parse(response.body).otp_code });
				}
			});
		}
	});
};

module.exports.login = async (req, res) => {
	try {
		const result = await User.getUserInfoLogin(req.body.phone);
		if (result) {
			bcrypt.compare(req.body.password, result.password).then((ress) => {
				if (ress) {
					const token = jwt.sign(
						{
							name: result.name,
							id: result._id,
							phone: req.body.phone
						},
						process.env.SECRET,
						{ expiresIn: 60 * 60 }
					);
					res.json({ token });
				} else {
					res.sendStatus(401);
				}
			});
		} else {
			res.sendStatus(401);
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports.orderOnline = (req, res) => {
	const instance = new Razorpay({
		key_id: process.env.RAZORPAY_ID,
		key_secret: process.env.RAZORPAY_SECRET
	});
	const price = req.body.price;
	console.log(price);
	try {
		const options = {
			amount: price * 100,
			currency: 'INR',
			receipt: 'receipt#1',
			payment_capture: 0
		};
		instance.orders.create(options, async function(err, order) {
			console.log(err);
			console.log(order);
			return res.status(200).json(order);
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports.capturePayment = (req, res) => {
	const database = req.app.locals.db;
	const price = req.body.price;
	const order = JSON.parse(req.body.order);
	for (let i = 0; i < order.length; i++) {
		order[i].reject = false;
	}
	const address = req.body.address;
	try {
		return request(
			{
				method: 'POST',
				url: `https://${process.env.RAZORPAY_ID}:${process.env
					.RAZORPAY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
				form: {
					amount: price * 100,
					currency: 'INR'
				}
			},
			async function(err, response, body) {
				console.log(err);
				if (err) {
					return res.status(500).json({
						message: 'Something Went Wrong'
					});
				}
				jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
					if (err) {
						console.log(err.message);
						res.sendStatus(401);
					} else {
						order.map((item) => {
							try {
								const filter = { 'products._id': ObjectID(item._id) };
								const updateDoc = { $inc: { 'products.$.stock': -parseInt(item.count) } };
								const result = User.updateStock(filter, updateDoc);
							} catch (err) {
								console.log(err);
							}
						});

						const user = {
							phone: decoded.phone,
							name: decoded.name
						};
						try {
							const result = User.addOrder(order, price, address, user, {
								mode: 'Online ',
								id: req.params.paymentId
							});
						} catch (err) {
							console.log(err);
						}
					}
				});
				console.log('Status:', response.statusCode);

				return res.status(200).json(body);
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Something Went Wrong'
		});
	}
};

module.exports.codPayment = (req, res) => {
	const order = JSON.parse(req.body.order);
	for (let i = 0; i < order.length; i++) {
		order[i].reject = false;
	}
	const price = req.body.price;
	const address = req.body.address;
	jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			const user = {
				phone: decoded.phone,
				name: decoded.name
			};
			order.map((item) => {
				try {
					const filter = { 'products._id': ObjectID(item._id) };
					const updateDoc = { $inc: { 'products.$.stock': -parseInt(item.count) } };
					const result = User.updateStock(filter, updateDoc);
				} catch (err) {
					console.log(err);
				}
			});
			try {
				const result = User.addOrder(order, price, address, user, { mode: 'COD' });
				res.json({ message: 'Order Placed' });
			} catch (err) {
				console.log(err);
			}
		}
	});
};

module.exports.otpLogin = async (req, res) => {
	const phone = req.body.phone;
	try {
		const result = await User.getUserInfoLogin(phone);
		if (result) {
			const options = {
				method: 'POST',
				url: 'https://d7networks.com/api/verifier/send',
				headers: {
					Authorization: process.env.D7APIKEY
				},
				formData: {
					mobile: phone,
					sender_id: 'SMSINFO',
					message: 'Your otp code for MyMart register is {code}',
					expiry: '1800'
				}
			};
			request(options, function(error, response) {
				console.log(error);
				if (!error) {
					const data = JSON.parse(response.body);
					console.log(data.otp_id);
					const token = jwt.sign(
						{
							phone: phone,
							otp_id: data.otp_id,
							name: result.name,
							id: result._id
						},
						process.env.SECRET,
						{ expiresIn: '600s' }
					);
					console.log(token);
					res.json({ temp: token });
				} else {
					res.json({ status: 'error', message: 'Error while sending otp' });
				}
			});
		} else {
			res.send(401);
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports.otpLoginVerify = (req, res) => {
	const token = req.body.token;
	const otp = req.body.otp;
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log(decoded);
			const options = {
				method: 'POST',
				url: 'https://d7networks.com/api/verifier/verify',
				headers: {
					Authorization: process.env.D7APIKEY
				},
				formData: {
					otp_id: decoded.otp_id,
					otp_code: otp
				}
			};
			request(options, async function(error, response) {
				console.log(response.body);
				console.log(error + '[ERROR]');
				if (!error && JSON.parse(response.body).status === 'success') {
					const token = jwt.sign(
						{
							name: decoded.name,
							id: decoded._id,
							phone: decoded.phone
						},
						process.env.SECRET,
						{ expiresIn: 60 * 60 }
					);
					res.json({ token });
				} else {
					res.json({ status: 'error', message: JSON.parse(response.body).otp_code });
				}
			});
		}
	});
};

module.exports.dealerLiveChecker = async (req, res) => {
	User.dealerLiveCheck(req.body.dealer)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.getAllOrder = (req, res) => {
	jwt.verify(req.body.token, process.env.SECRET, async (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			User.getAllOrder(decoded.phone)
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					console(err);
				});
		}
	});
};

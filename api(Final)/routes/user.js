const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const request = require('request');
const bcrypt = require('bcrypt');

router.get('/items/:store', async (req, res) => {
	const store = req.params.store;
	try {
		const database = req.app.locals.db;
		const collection = database.collection('dealer');
		const reslut = await collection.find({ dealer_name: store }).project({ products: 1, _id: 0, live: 1 });
		const response = [];
		await reslut.forEach((doc) => response.push(doc));
		await res.json(response);
	} catch (err) {
		console.log(err);
	}
});

router.get('/store/', async (req, res) => {
	try {
		const database = req.app.locals.db;
		const collection = database.collection('dealer');
		const reslut = await collection.find({}).project({ dealer_name: 1, _id: 0 });
		const response = [];
		await reslut.forEach((doc) => response.push(doc));
		await res.json(response);
	} catch (err) {
		console.log(err);
	}
});

router.post('/auth', (req, res) => {
	jwt.verify(req.body.token, 'secret', (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(401);
		} else {
			console.log(decoded);
			res.sendStatus(200);
		}
	});
});

router.post('/register', async (req, res) => {
	try {
		const database = req.app.locals.db;
		const collection = database.collection('users');
		const reslut = await collection.findOne({ phone: req.body.phone });
		console.log(req.body);
		if (!reslut) {
			const name = req.body.name;
			const location = req.body.location;
			const phone = req.body.phone;
			const password = req.body.password;
			const options = {
				method: 'POST',
				url: 'https://d7networks.com/api/verifier/send',
				headers: {
					Authorization: 'Token  44eb16ea4957f54679397bd892e0ef88fba3ca05'
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
						'secret',
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
});
router.post('/register/auth', (req, res) => {
	const database = req.app.locals.db;
	const otp = req.body.otp;
	console.log(otp);
	jwt.verify(req.body.token, 'secret', (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.json({ status: 'error', message: 'Error' });
		} else {
			console.log(decoded);
			const request = require('request');
			const options = {
				method: 'POST',
				url: 'https://d7networks.com/api/verifier/verify',
				headers: {
					Authorization: 'Token  44eb16ea4957f54679397bd892e0ef88fba3ca05'
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
					try {
						const collection = database.collection('users');
						const reslut = await collection.insertOne(user);
						console.dir(reslut.insertedCount);
						res.sendStatus(200);
					} catch (err) {
						console.log(err);
						res.sendStatus(501);
					}
				} else {
					res.json({ status: 'error', message: JSON.parse(response.body).otp_code });
				}
			});
		}
	});
});

router.post('/login', async (req, res) => {
	try {
		const database = req.app.locals.db;
		const collection = database.collection('users');
		const reslut = await collection.findOne({ phone: req.body.phone });
		bcrypt.compare(req.body.password, reslut.password).then((ress) => {
			if (ress) {
				const token = jwt.sign(
					{
						name: reslut.name,
						id: reslut._id
					},
					'secret',
					{ expiresIn: 60 * 60 }
				);
				res.json({ token });
			} else {
				res.sendStatus(401);
			}
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const { isAuth, isAuthHeader } = require('../middleware');
const bcrypt = require('bcrypt');
//Login the admin
router.post('/login', (req, res) => {
	console.log(req.body);
	if (req.body.username === 'admin' && req.body.password === 'admin') {
		const token = jwt.sign(
			{
				data: 'admin'
			},
			'secret',
			{ expiresIn: 60 * 1600 }
		);
		res.json({ token });
	} else {
		res.sendStatus(401);
	}
});

//Check if the admin is authenticated
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
//Get all the dealer
router
	.post('/dealers', isAuth, async (req, res) => {
		try {
			const database = req.app.locals.db;
			const collection = database.collection('dealer');
			const reslut = await collection.find();
			const response = [];
			await reslut.forEach((doc) => response.push(doc));
			await res.json(response);
		} catch (err) {
			next(err);
		}
	})
	//Get a single dealer
	.post('/dealers/:id', isAuth, async (req, res) => {
		try {
			const database = req.app.locals.db;
			console.log(req.params.id);
			const collection = database.collection('dealer');
			const reslut = await collection.findOne({ _id: ObjectID(req.params.id) });
			await res.json(reslut);
		} catch (err) {
			res.sendStatus(200);
			console.log(err);
		}
	}) //Create a new dealer
	.post('/dealer', isAuth, async (req, res) => {
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
			live: false
		};
		try {
			const database = req.app.locals.db;
			const collection = database.collection('dealer');
			const reslut = await collection.insertOne(dealer);
			console.dir(reslut.insertedCount);
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}) //Edit a vendor
	.put('/dealers/:id', isAuth, async (req, res) => {
		const filter = { _id: ObjectID(req.params.id) };
		console.log(filter);
		let updateDoc = {
			$set: {
				dealer_name: req.body.dealer_name,
				username: req.body.username,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
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
					password: hash
				}
			};
		}
		const options = { upsert: false };
		try {
			const database = req.app.locals.db;
			const collection = database.collection('dealer');
			const result = await collection.updateOne(filter, updateDoc, options);
			console.log(
				`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
			);
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}) // Delete a vendor
	.delete('/dealers/:id', isAuthHeader, async (req, res) => {
		const query = { _id: ObjectID(req.params.id) };
		try {
			const database = req.app.locals.db;
			const collection = database.collection('dealer');
			const result = await collection.deleteOne(query);
			if (result.deletedCount === 1) {
				console.dir('Successfully deleted one document.');
			} else {
				console.log('No documents matched the query. Deleted 0 documents.');
			}
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	});
router
	.post('/settings', isAuth, async (req, res) => {
		try {
			const database = req.app.locals.db;
			const collection = database.collection('setting');
			const reslut = await collection.find();
			const response = [];
			await reslut.forEach((doc) => response.push(doc));
			await res.json(response);
		} catch (err) {
			console.log(err);
		}
	})
	.put('/settings', isAuth, async (req, res) => {
		try {
			const database = req.app.locals.db;
			const collection = database.collection('setting');
			const updateDoc = { $set: { live: req.body.set } };
			const options = { upsert: true };
			const result = await collection.updateOne(
				{ _id: ObjectID('5f6193c23877de90cf0d07cd') },
				updateDoc,
				options
			);
			console.log(
				`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
			);
			res.sendStatus(200);
		} catch (err) {
			console.log(err);
		}
	})
	.post('/unit', isAuth, async (req, res) => {
		try {
			const database = req.app.locals.db;
			const collection = database.collection('unit');
			const reslut = await collection.find({}).project({ units: 1 });
			const response = [];
			await reslut.forEach((doc) => response.push(doc));
			await res.json(response);
		} catch (err) {
			console(err);
		}
	});

module.exports = router;

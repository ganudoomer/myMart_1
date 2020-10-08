const jwt = require('jsonwebtoken');
const bcrpy = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;

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
};

module.exports.getSingleDealer = async (req, res) => {
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
	try {
		const database = req.app.locals.db;
		const collection = database.collection('dealer');
		const reslut = await collection.insertOne(dealer);
		console.dir(reslut.insertedCount);
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

module.exports.editDealer = async (req, res) => {
	const filter = { _id: ObjectID(req.params.id) };
	console.log(filter);
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
};

module.exports.deleteDelaer = async (req, res) => {
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
};

module.exports.getUnit = async (req, res) => {
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
};

module.exports.addUnit = async (req, res) => {
	try {
		const database = req.app.locals.db;
		const collection = database.collection('unit');
		const reslut = await collection.updateOne({}, { $push: { units: req.body.unit } });
		console.dir(reslut.insertedCount);
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
	}
};

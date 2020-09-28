const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const { isAuth, isAuthHeader } = require('../middleware');
const bcrypt = require('bcrypt');
const multer = require('multer');
const sharp = require('sharp');
//MUlter Config
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/images');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage: storage }).single('file');

//Login the admin
router.post('/login', async (req, res) => {
	const password = req.body.password;
	const username = req.body.username;
	try {
		console.log(req.body);
		const database = req.app.locals.db;
		const collection = database.collection('dealer');
		const reslut = await collection.findOne({ username: username });
		if (reslut) {
			bcrypt.compare(password, reslut.password).then((ress) => {
				if (ress) {
					const token = jwt.sign(
						{
							username: reslut.username,
							id: reslut._id,
							dealer: reslut.dealer_name
						},
						'secret',
						{ expiresIn: 60 * 1600 }
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
});

//Check if the dealer is authenticated
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
//Get all the products
router
	.post('/products', isAuth, (req, res) => {
		jwt.verify(req.body.token, 'secret', async (err, decoded) => {
			if (err) {
				console.log(err.message);
				res.sendStatus(401);
			} else {
				try {
					const database = req.app.locals.db;
					const collection = database.collection('dealer');
					const reslut = await collection.find({ username: decoded.username }).project({ products: 1 });
					const response = [];
					await reslut.forEach((doc) => response.push(doc));
					await res.json(response);
				} catch (err) {
					console(err);
				}
				console.log(decoded);
			}
		});
	})
	//Create a new product
	.post('/product', isAuth, async (req, res) => {
		const product = {
			name: req.body.name,
			_id: ObjectID(),
			title: req.body.title,
			description: req.body.description,
			image: { imageName: req.body.image, thumbnail: req.body.thumbnail },
			price: req.body.price,
			unit: req.body.unit,
			cat: req.body.cat
		};
		jwt.verify(req.body.token, 'secret', async (err, decoded) => {
			if (err) {
				console.log(err.message);
				res.sendStatus(401);
			} else {
				console.log(decoded + '[POST PRODUCt]');
				try {
					const database = req.app.locals.db;
					const collection = database.collection('dealer');
					const reslut = await collection.updateOne(
						{ username: decoded.username },
						{ $push: { products: product } }
					);
					console.dir(reslut.insertedCount);
					res.sendStatus(200);
				} catch (err) {
					console.log(err);
				}
			}
		});
	}) //Edit a product
	.put('/product/:id', isAuth, async (req, res) => {
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
				'products.$.cat': req.body.cat
			}
		};

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
			console(err);
		}
	}) // Delete a product
	.delete('/product/:id', isAuthHeader, async (req, res) => {
		const bearerHeader = req.headers['authorization'];
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		jwt.verify(bearerToken, 'secret', async (err, decoded) => {
			if (err) {
				console.log(err.message);
				res.sendStatus(401);
			} else {
				console.log(decoded);
				try {
					const database = req.app.locals.db;
					const collection = database.collection('dealer');
					const result = await collection.updateOne(
						{ username: decoded.username },
						{ $pull: { products: { _id: ObjectID(req.params.id) } } }
					);
					console.log(
						`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
					);
					res.sendStatus(200);
				} catch (err) {
					console(err);
				}
			}
		});
	});
router
	.post('/settings', isAuth, (req, res) => {
		jwt.verify(req.body.token, 'secret', async (err, decoded) => {
			if (err) {
				console.log(err.message);
				res.sendStatus(401);
			} else {
				try {
					const database = req.app.locals.db;
					const collection = database.collection('dealer');
					const reslut = await collection.find({ username: decoded.username }).project({ live: 1 });
					const response = [];
					await reslut.forEach((doc) => response.push(doc));
					await res.json(response);
					console.log(reslut);
				} catch (err) {
					console.log(err);
				}
				console.log(decoded);
				res.sendStatus(200);
			}
		});
	})
	.put('/settings', isAuth, async (req, res) => {
		jwt.verify(req.body.token, 'secret', async (err, decoded) => {
			if (err) {
				console.log(err.message);
				res.sendStatus(401);
			} else {
				let set = false;
				console.log(decoded);
				if (req.body.set === 'true') {
					set = true;
				}
				try {
					const database = req.app.locals.db;
					const collection = database.collection('dealer');
					const updateDoc = { $set: { live: set } };
					const options = { upsert: true };
					const result = await collection.updateOne({ username: decoded.username }, updateDoc, options);
					console.log(
						`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
					);
					res.sendStatus(200);
				} catch (err) {
					console.log(err);
				}
			}
		});
	})
	.post('/productsingle/:id', (req, res) => {
		const id = req.params.id;
		jwt.verify(req.body.token, 'secret', async (err, decoded) => {
			if (err) {
				console.log(err.message);
				res.sendStatus(401);
			} else {
				console.log(decoded);
				try {
					const database = req.app.locals.db;
					const collection = database.collection('dealer');
					const result = await collection.findOne({
						username: decoded.username,
						'products._id': ObjectID(id)
					});
					const arr = result.products;
					const response = arr.filter((products) => products._id == id);
					res.json(response);
				} catch (err) {
					console.log(err);
				}
			}
		});
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
	})
	.post('/upload', (req, res) => {
		const url = req.protocol + '://' + req.get('host') + '/images/';
		upload(req, res, async function(err) {
			if (!req.file) {
				return { status: 'failed', message: 'No image to upload' };
			}
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err);
			} else if (err) {
				return res.status(500).json(err);
			}
			try {
				const bismi = {
					imageName: url + req.file.filename,
					thumbnail: url + 'thumbnails/' + 'thumbnails-' + req.file.filename
				};
				sharp(req.file.path)
					.resize(416, 234)
					.toFile('public/images/thumbnails/' + 'thumbnails-' + req.file.filename, (err, resizeImage) => {
						if (err) {
							console.log(err);
						} else {
							console.log(resizeImage);
							return res.json(bismi);
						}
					});
			} catch (error) {
				console.error(error);
			}
		});
	});

module.exports = router;

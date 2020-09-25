const env = require('dotenv').config();
const express = require('express');
const app = express();
const admin = require('./routes/admin');
const cros = require('cors');
const { MongoClient } = require('mongodb');
const dealer = require('./routes/dealer');
const user = require('./routes/user');
const multer = require('multer');
const sharp = require('sharp');
const ObjectID = require('mongodb').ObjectID;
app.use(cros());
app.use(express.json());

app.use(express.static('public'));
//Providing mongodb instance globally===================================================//
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });
(async function run() {
	try {
		await client.connect().then(() => console.log('Mongodb has connected'));
		const database = client.db('myMart');
		app.locals.db = database;
	} catch (e) {
		console.log(e);
	}
})();
//=======================================================================================//

//===============================================================================//
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/images');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
var upload = multer({ storage: storage }).single('file');

app.post('/upload', function(req, res) {
	const url = req.protocol + '://' + req.get('host') + '/images/';
	upload(req, res, async function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		try {
			const database = req.app.locals.db;
			const collection = database.collection('images');
			const bismi = {
				imageName: url + req.file.filename,
				thumbnail: url + 'thumbnails/' + 'thumbnails-' + req.file.filename
			};
			const reslut = await collection.insertOne(bismi);
			console.dir(reslut.insertedCount);
			sharp(req.file.path)
				.resize(416, 234)
				.toFile('public/images/thumbnails/' + 'thumbnails-' + req.file.filename, (err, resizeImage) => {
					if (err) {
						console.log(err);
					} else {
						console.log(resizeImage);
					}
				});
			return res.status(201).json({
				message: 'File uploded successfully'
			});
		} catch (error) {
			console.error(error);
		}
	});
});

app.post('/uploadtest', function(req, res) {
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

app.post('/createTest', async (req, res) => {
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
	try {
		const database = req.app.locals.db;
		const collection = database.collection('dealer');
		const reslut = await collection.updateOne({ username: 'bismi' }, { $push: { products: product } });
		console.dir(reslut.insertedCount);
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
	}
});

//=================================================================================//

app.use('/admin', admin);
app.use('/dealer', dealer);
app.use('/user', user);
app.get('/mongotest', async (req, res, next) => {
	try {
		const database = req.app.locals.db;
		const collection = database.collection('unit');
		const bismi = { units: [ 'Kg', 'Gram', 'Unit' ] };
		const reslut = await collection.insertOne(bismi);
		console.dir(reslut.insertedCount);
	} catch (err) {
		next(err);
	}
});

// MongoClient.connect('mongodb://localhost:27017/test', { useUnifiedTopology: true })
// 	.catch((err) => console.error(err.stack))
// 	.then(async () => {
// 		console.log(await MongoClient.db);

// 	});
// const uri = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(uri);
// async function run() {
// 	try {
// 		await client.connect();
// 		const database = client.db('test');
// 		app.locals.db = database;
// 	} catch (e) {
// 		console.log(e);
// 	}
// }
// run().catch(console.dir);

app.listen(process.env.PORT, () => {
	console.log('Your server is runing in ' + process.env.PORT + ' master');
});

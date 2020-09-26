// const request = require('request');
// const options = {
// 	method: 'GET',
// 	url: 'https://google.com',
// 	headers: {
// 		Authorization: 'Token  f5310ff5049a0cc967c0206eddd4819248961442'
// 	},
// 	formData: {
// 		mobile: 918075501259,
// 		sender_id: 'SMSINFO',
// 		message: 'Your otp code for MyMart register is {code}',
// 		expiry: '1800'
// 	}
// };

const { MongoClient } = require('mongodb');

// request(options, function(error, response) {
// 	console.log(error + 'lkjl');
// 	console.log(response);
// });

// //==============================================================//
// var storage = multer.diskStorage({
// 	destination: function(req, file, cb) {
// 		cb(null, 'public/images');
// 	},
// 	filename: function(req, file, cb) {
// 		cb(null, Date.now() + '-' + file.originalname);
// 	}
// });
// var upload = multer({ storage: storage }).single('file');

// app.post('/upload', function(req, res) {
// 	const url = req.protocol + '://' + req.get('host') + '/images/';
// 	upload(req, res, async function(err) {
// 		if (err instanceof multer.MulterError) {
// 			return res.status(500).json(err);
// 		} else if (err) {
// 			return res.status(500).json(err);
// 		}
// 		try {
// 			const database = req.app.locals.db;
// 			const collection = database.collection('images');
// 			const bismi = {
// 				imageName: url + req.file.filename,
// 				thumbnail: url + 'thumbnails/' + 'thumbnails-' + req.file.filename
// 			};
// 			const reslut = await collection.insertOne(bismi);
// 			console.dir(reslut.insertedCount);
// 			sharp(req.file.path)
// 				.resize(416, 234)
// 				.toFile('public/images/thumbnails/' + 'thumbnails-' + req.file.filename, (err, resizeImage) => {
// 					if (err) {
// 						console.log(err);
// 					} else {
// 						console.log(resizeImage);
// 					}
// 				});
// 			return res.status(201).json({
// 				message: 'File uploded successfully'
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	});
// });

// app.post('/uploadtest', function(req, res) {
// 	const url = req.protocol + '://' + req.get('host') + '/images/';
// 	upload(req, res, async function(err) {
// 		if (!req.file) {
// 			return { status: 'failed', message: 'No image to upload' };
// 		}
// 		if (err instanceof multer.MulterError) {
// 			return res.status(500).json(err);
// 		} else if (err) {
// 			return res.status(500).json(err);
// 		}
// 		try {
// 			const bismi = {
// 				imageName: url + req.file.filename,
// 				thumbnail: url + 'thumbnails/' + 'thumbnails-' + req.file.filename
// 			};
// 			sharp(req.file.path)
// 				.resize(416, 234)
// 				.toFile('public/images/thumbnails/' + 'thumbnails-' + req.file.filename, (err, resizeImage) => {
// 					if (err) {
// 						console.log(err);
// 					} else {
// 						console.log(resizeImage);
// 						return res.json(bismi);
// 					}
// 				});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	});
// });

// app.post('/createTest', async (req, res) => {
// 	const product = {
// 		name: req.body.name,
// 		_id: ObjectID(),
// 		title: req.body.title,
// 		description: req.body.description,
// 		image: { imageName: req.body.image, thumbnail: req.body.thumbnail },
// 		price: req.body.price,
// 		unit: req.body.unit,
// 		cat: req.body.cat
// 	};
// 	try {
// 		const database = req.app.locals.db;
// 		const collection = database.collection('dealer');
// 		const reslut = await collection.updateOne({ username: 'bis	mi' }, { $push: { products: product } });
// 		console.dir(reslut.insertedCount);
// 		res.sendStatus(200);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

const objectId = require('mongodb').ObjectId;
const original_id = objectId;
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });
(async function run() {
	try {
		await client.connect().then(() => console.log('Mongodb has connected'));
		const db = client.db('myMart');
		db.collection('people').insert({
			_id: original_id,
			name: 'Broadway Center',
			url: 'bc.example.net'
		});

		db.collection('people').insert({
			name: 'Erin',
			places_id: original_id,
			url: 'bc.example.net/Erin'
		});
	} catch (e) {
		console.log(e);
	}
})();

console.log(objectId());

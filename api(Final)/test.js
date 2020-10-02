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

const ObjectId = require('mongodb').ObjectId;
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });
(async function run() {
	try {
		await client.connect().then(() => console.log('Mongodb has connected'));
		const db = client.db('myMart');
		db.collection('oders').insert({
			dealer_name: 'bismi',
			username: 'ganesh',
			payment: 'cod',
			item: [ { name: 'Laptop-Edited' }, { name: 'Laptop' }, { name: 'Phone' } ]
		});
	} catch (e) {
		console.log(e);
	}
})();
//====================================================================//
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

//=========================================================================//

app.post('/orders', (req, res) => {
	const instance = new Razorpay({
		key_id: 'rzp_test_pD7pyj5JpXOA5a',
		key_secret: 'kxSNiaFxtvlBNBwXT7pBSp8f'
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
});

app.post('/capture/:paymentId', (req, res) => {
	const database = req.app.locals.db;
	const price = req.body.price;
	const order = JSON.parse(req.body.order);
	const address = req.body.address;
	try {
		return request(
			{
				method: 'POST',
				url: `https://rzp_test_pD7pyj5JpXOA5a:kxSNiaFxtvlBNBwXT7pBSp8f@api.razorpay.com/v1/payments/${req.params
					.paymentId}/capture`,
				form: {
					amount: price * 100, // amount == Rs 10 // Same As Order amount
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
				try {
					const collection = database.collection('orders');
					const result = collection.insertOne({ order, price, address });
					console.dir(result.insertedCount);
				} catch (err) {
					console.log(err);
				}
				console.log('Status:', response.statusCode);
				console.log('Headers:', JSON.stringify(response.headers));
				console.log('Response:', body);
				return res.status(200).json(body);
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Something Went Wrong'
		});
	}
});

app.post('/dealerorder', async (req, res) => {
	const dealerName = req.body.dealer;
	console.log(dealerName);
	const database = req.app.locals.db;
	const collection = database.collection('orders');
	const result = await collection.find({ 'order.dealer_name': 'bismi' });
	const response = [];
	await result.forEach((doc) => response.push(doc));
	res.json(response);
});

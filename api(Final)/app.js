const env = require('dotenv').config();
const express = require('express');
const app = express();
const admin = require('./routes/admin');
const cros = require('cors');
const { MongoClient } = require('mongodb');
const dealer = require('./routes/dealer');
const user = require('./routes/user');
const Razorpay = require('razorpay');
const ObjectID = require('mongodb').ObjectID;
const request = require('request');
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

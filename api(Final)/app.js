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
//Color and Theme Test

app.post('/theme', async (req, res) => {
	const dealer = {
		dealer_name: req.body.dealer_name,
		username: req.body.username,
		phone: req.body.phone,
		email: req.body.email,
		address: req.body.address,
		no_of_orders: 0,
		password: '123',
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

app.listen(process.env.PORT, () => {
	console.log('Your server is runing in ' + process.env.PORT + ' master');
});

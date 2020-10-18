const router = require('express').Router;

router.get('/mongotest', async (req, res, next) => {
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
//Color and Theme Test

router.post('/theme', async (req, res) => {
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

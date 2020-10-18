const ObjectID = require('mongodb').ObjectID;
const { dealerCollection, userCollection, orderCollection } = require('./mongodbConfig');
const { db } = require('./mongodb');

module.exports.getItems = function(store) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection
				.find({ dealer_name: store })
				.project({ products: 1, _id: 0, live: 1, image: 1 });
			const response = [];
			await result.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getStore = function() {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const reslut = await collection.find({}).project({ dealer_name: 1, _id: 0 });
			const response = [];
			await reslut.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getUserInfo = function(phone) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(userCollection);
			const result = await collection.find({ phone: phone }).project({ location: 1, _id: 0 });
			const response = [];
			await result.forEach((data) => {
				response.push(data);
			});
			await resolve(response[0]);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.addtUser = function(user) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(userCollection);
			const reslut = await collection.insertOne(user);
			console.dir(reslut.insertedCount);
			await resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getUserInfoLogin = function(phone) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(userCollection);
			const result = await collection.findOne({ phone: phone });
			await resolve(result);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.updateStock = function(filter, update) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = collection.updateOne(filter, update);
			await resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.addOrder = function(order, price, address, user, payment) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(orderCollection);
			const result = collection.insertOne({
				order,
				price,
				address,
				user,
				createdOn: new Date(),
				status: 'Pending',
				payment
			});
			console.dir(result.insertedCount);
			await resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getAllOrder = function(phone) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(orderCollection);
			const result = await collection.find({ 'user.phone': phone });
			const response = [];
			await result.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.dealerLiveCheck = function(dealer) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.find({ dealer_name: dealer }).project({ live: 1 });
			const response = [];
			await result.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

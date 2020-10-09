const { db } = require('./mongodb');
const { dealerCollection, unitCollection, orderCollection } = require('./mongodbConfig');
const { ObjectID } = require('mongodb');

module.exports.find = function(username) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const reslut = await collection.findOne({ username: username });
			resolve(reslut);
		} catch (err) {
			reject(err);
			console.log(err);
		}
	});
};

module.exports.getAllProducts = function(username) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection
				.find({ username: username })
				.project({ products: 1, image: 1, color: 1, dealer_name: 1 });
			const response = [];
			await result.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.addProduct = function(username, product) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.updateOne({ username: username }, { $push: { products: product } });
			console.dir(result.insertedCount);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.editProduct = function(filter, update, option) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.updateOne(filter, update, option);
			console.log(
				`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
			);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.deleteProduct = function(username, id) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.updateOne(
				{ username: username },
				{ $pull: { products: { _id: ObjectID(id) } } }
			);
			console.log(
				`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
			);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.deleteProduct = function(username, id) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.updateOne(
				{ username: username },
				{ $pull: { products: { _id: ObjectID(id) } } }
			);
			console.log(
				`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
			);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getSingleProduct = function(username, id) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.findOne({
				username: username,
				'products._id': ObjectID(id)
			});
			const arr = result.products;
			const response = arr.filter((products) => products._id == id);
			resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getSettings = function(username) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.find({ username: username }).project({ live: 1 });
			const response = [];
			await result.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.changeSettings = function(username, update, option) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.updateOne({ username: username }, update, option);
			console.log(
				`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
			);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getUnit = function() {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(unitCollection);
			const reslut = await collection.find({}).project({ units: 1 });
			const response = [];
			await reslut.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getOrder = function(dealer) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(orderCollection);
			const result = await collection.find({ 'order.dealer_name': dealer });
			const response = [];
			await result.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};
module.exports.editOrderStatus = function(id, update, option) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(orderCollection);

			const result = await collection.updateOne({ _id: ObjectID(id) }, update, option);
			console.log(
				`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
			);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.editItemStatus = function(id, orderId, update, option) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(orderCollection);

			const result = await collection.updateOne({ _id: ObjectID(orderId), 'order._id': id }, update, option);
			console.log(
				`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
			);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

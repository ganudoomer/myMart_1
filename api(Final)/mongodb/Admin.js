const { db } = require('./mongodb');
const { dealerCollection, unitCollection } = require('./mongodbConfig');
const { ObjectID } = require('mongodb');

module.exports.getAllDealer = function() {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.find();
			const response = [];
			await result.forEach((doc) => response.push(doc));
			await resolve(response);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.getSingleDealer = function(id) {
	return new Promise(async (resolve, reject) => {
		try {
			console.log(id);
			const collection = db().collection(dealerCollection);
			const result = await collection.findOne({ _id: ObjectID(id) });
			await resolve(result);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.addNewDealer = function(dealer) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.insertOne(dealer);
			await resolve();
		} catch (err) {
			reject(err);
		}
	});
};

module.exports.editDealer = function(filter, update, option) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = await db().collection(dealerCollection);
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

module.exports.deleteDealer = function(query) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(dealerCollection);
			const result = await collection.deleteOne(query);
			if (result.deletedCount === 1) {
				console.dir('Successfully deleted one document.');
			} else {
				console.log('No documents matched the query. Deleted 0 documents.');
			}
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

module.exports.addUnit = function(unit) {
	return new Promise(async (resolve, reject) => {
		try {
			const collection = db().collection(unitCollection);
			const reslut = await collection.updateOne({}, { $push: { units: unit } });
			console.dir(reslut.insertedCount);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

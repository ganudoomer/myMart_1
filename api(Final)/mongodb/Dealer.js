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

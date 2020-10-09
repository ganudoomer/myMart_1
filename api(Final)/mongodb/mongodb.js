const { MongoClient } = require('mongodb');
const monogoConfig = require('./mongodbConfig');
const uri = process.env.MONGOURI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

const state = {
	db: null
};

module.exports.connect = function() {
	return new Promise((resolve, reject) => {
		client
			.connect()
			.then((client) => {
				console.log('Mongodb has connected');
				const db = client.db(monogoConfig.database);
				resolve(db);
				state.db = db;
			})
			.catch((err) => {
				reject(err);
			});
	});
};

module.exports.db = function() {
	return state.db;
};

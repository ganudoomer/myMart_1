const env = require('dotenv').config();
const express = require('express');
const app = express();
const cros = require('cors');
const { connect } = require('./mongodb/mongodb');
const admin = require('./routes/admin');
const dealer = require('./routes/dealer');
const user = require('./routes/user');
// create a custom timestamp format for log statements

app.use(cros());
app.use(express.json());
app.use(express.static('public'));

//Connecting to MongoClient and passing an instance to app.locals
connect()
	.then(() => {
		console.log('Mongodb connected ');
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/', (req, res) => {
	res.json({ message: 'Hello Welcome to my mart server ' });
});

app.use('/admin', admin);
app.use('/dealer', dealer);
app.use('/user', user);

app.listen(process.env.PORT, () => {
	console.log('Your server is runing in ' + process.env.PORT + ' master');
});

const request = require('request');
const options = {
	method: 'GET',
	url: 'https://google.com',
	headers: {
		Authorization: 'Token  f5310ff5049a0cc967c0206eddd4819248961442'
	},
	formData: {
		mobile: 918075501259,
		sender_id: 'SMSINFO',
		message: 'Your otp code for MyMart register is {code}',
		expiry: '1800'
	}
};

request(options, function(error, response) {
	console.log(error + 'lkjl');
	console.log(response);
});

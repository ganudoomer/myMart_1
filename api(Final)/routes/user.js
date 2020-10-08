const router = require('express').Router();
const userController = require('../controller/userController');

//==============Authorization and Authentication=====================//

//Registration and sending OTP
router
	.post('/register', userController.registerUser)
	//Verifying OTP and Pushing to database
	.post('/register/auth', userController.registerUserAuth);
//Login User
router
	.post('/login', userController.login)
	//Login Use via OTP
	.post('/login/otp', userController.otpLogin)
	//Verifying User OTP
	.post('/login/verify', userController.otpLoginVerify);
//Checking the user auth state
router.post('/auth', userController.authUser);

//===============Store & User Info and Items ==========================//
//Get items from store
router
	.get('/items/:store', userController.getItems)
	//Get all store
	.get('/store/', userController.getStore)
	//Get user info
	.post('/userinfo', userController.getUserInfo);

//=============================Order====================================//
router
	//Genrate Order_ID from rzpy
	.post('/order', userController.orderOnline)
	//Capture Payment and place order
	.post('/capture/:paymentId', userController.capturePayment)
	//Cash on delivery
	.post('/ordercod', userController.codPayment)
	//Get the status of the store
	.post('/live', userController.dealerLiveChecker)
	//Get all orders
	.post('/orders', userController.getAllOrder);

module.exports = router;

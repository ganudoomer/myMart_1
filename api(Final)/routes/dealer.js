const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const { isAuth, isAuthHeader } = require('../middleware');
const bcrypt = require('bcrypt');
const multer = require('multer');
const sharp = require('sharp');
const dealerController = require('../controller/dealerController');

//====================Login and Auth=====================================//
//Login the admin
router.post('/login', dealerController.loginDealer);
//Check if the dealer is authenticated
router.post('/auth', dealerController.dealerAuth);

//=================Products================================//
router
	//Get all the products
	.post('/products', isAuth, dealerController.getAllProducts)
	//Create a new product
	.post('/product', isAuth, dealerController.createProduct)
	//Edit a product
	.put('/product/:id', isAuth, dealerController.editProduct)
	//Get single product
	.post('/productsingle/:id', isAuth, dealerController.getSingleDealer)
	// Delete a product
	.delete('/product/:id', isAuthHeader, dealerController.deleteProduct);

//========================Setting==================================//
router
	.post('/settings', isAuth, dealerController.getSettings)
	//Edit settings
	.put('/settings', isAuth, dealerController.changeSetting);

//====================Units  and Uploads ===========================//
router
	//Get the units
	.post('/unit', isAuth, dealerController.getUnits)
	//COMMON ROUTE FOR DEALER AND ADMIN
	.post('/upload', dealerController.uploadImage);

//===================Order===========================================//
router
	//Get all the orders
	.post('/orders', isAuth, dealerController.getOrder)
	//Edit the status of the order
	.put('/orders', isAuth, dealerController.editOrderStatus)
	//
	.put('/item', isAuth, dealerController.editItemStatus);

module.exports = router;

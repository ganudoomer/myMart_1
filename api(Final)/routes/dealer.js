const router = require('express').Router();
const { isAuthDealer, isAuthHeaderDealer } = require('../middleware');
const dealerController = require('../controller/dealerController');

//====================Login and Auth=====================================//
//Login the admin
router.post('/login', dealerController.loginDealer);
//Check if the dealer is authenticated
router.post('/auth', dealerController.dealerAuth);

//=================Products================================//
router
	//Get all the products
	.post('/products', isAuthDealer, dealerController.getAllProducts)
	//Create a new product
	.post('/product', isAuthDealer, dealerController.createProduct)
	//Edit a product
	.put('/product/:id', isAuthDealer, dealerController.editProduct)
	//Get single product
	.post('/productsingle/:id', isAuthDealer, dealerController.getSingleDealer)
	// Delete a product
	.delete('/product/:id', isAuthHeaderDealer, dealerController.deleteProduct);

//========================Setting==================================//
router
	.post('/settings', isAuthDealer, dealerController.getSettings)
	//Edit settings
	.put('/settings', isAuthDealer, dealerController.changeSetting);

//====================Units  and Uploads ===========================//
router
	//Get the units
	.post('/unit', isAuthDealer, dealerController.getUnits)
	//COMMON ROUTE FOR DEALER AND ADMIN
	.post('/upload', dealerController.uploadImage);

//===================Order===========================================//
router
	//Get all the orders
	.post('/orders', isAuthDealer, dealerController.getOrder)
	//Edit the status of the order
	.put('/orders', isAuthDealer, dealerController.editOrderStatus)
	//Edit item status
	.put('/item', isAuthDealer, dealerController.editItemStatus);
//===================================================================//
module.exports = router;

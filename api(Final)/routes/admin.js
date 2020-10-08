const router = require('express').Router();
const { isAuthAdmin, isAuthHeaderAdmin } = require('../middleware');
const adminController = require('../controller/adminController');

//==============Authorization and Authentication=====================//
//Login the admin
router
	.post('/login', adminController.login)
	//Check if the admin is authenticated
	.post('/auth', adminController.checkAuth);

//======================Dealer=========================//
router
	//Get all the dealer
	.post('/dealers', isAuthAdmin, adminController.getAllDealer)
	//Get a single dealer
	.post('/dealers/:id', isAuthAdmin, adminController.getSingleDealer)
	//Create a new dealer
	.post('/dealer', isAuthAdmin, adminController.createNewDealer)
	//Edit a vendor
	.put('/dealers/:id', isAuthAdmin, adminController.editDealer)
	// Delete a vendor
	.delete('/dealers/:id', isAuthHeaderAdmin, adminController.editDealer);

//=============================Unit=================================//
router
	//View Units
	.post('/unit', isAuthAdmin, adminController.getUnit)
	//Add unit
	.post('/addunit', isAuthAdmin, adminController.addUnit);

module.exports = router;

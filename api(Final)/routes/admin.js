const router = require('express').Router();
const { isAuth, isAuthHeader } = require('../middleware');
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
	.post('/dealers', isAuth, adminController.getAllDealer)
	//Get a single dealer
	.post('/dealers/:id', isAuth, adminController.getSingleDealer)
	//Create a new dealer
	.post('/dealer', isAuth, adminController.createNewDealer)
	//Edit a vendor
	.put('/dealers/:id', isAuth, adminController.editDealer)
	// Delete a vendor
	.delete('/dealers/:id', isAuthHeader, adminController.editDealer);

//=============================Unit=================================//
router
	//View Units
	.post('/unit', isAuth, adminController.getUnit)
	//Add unit
	.post('/addunit', isAuth, adminController.addUnit);

module.exports = router;

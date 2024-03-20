const express = require('express');
const router = express.Router();
//-----------------userControllers----------------

const userControllers = require('../controllers/user.controllers')
router.post('/registerUser', userControllers.registerUser)
router.get('/loginUser', userControllers.loginUser)
router.get('/retrieveUserProfile/:id', userControllers.retrieveUserProfile)
router.put('/updateProfile/:id', userControllers.updateProfile)
router.delete('/deactivateUser/:id', userControllers.deactivateUser)
router.delete('/activateUser/:id', userControllers.activateUser)

//-----------------storeControllers----------------


const storeControllers = require('../controllers/store.controllers');
router.post('/registerStore', storeControllers.registerStore)


//-----------------menuControllers----------------

const menuControllers = require('../controllers/menu.controllers');
router.post('/foodMenu', menuControllers.foodMenu);
router.get('/storeWithMenu/:id', menuControllers.storeWithMenu);
router.put('/updateFoodItem/:id', menuControllers.updateFoodItem);
router.get('/getStoreMenuTogether', menuControllers.getStoreMenuTogether);


//-----------------orderControllers----------------
const orderControllers = require('../controllers/order.controller');
router.get('/browseMenu', orderControllers.browseMenu)
router.post('/createOrder', orderControllers.createOrder)
router.get('/orderHistory/:customerId', orderControllers.orderHistory)





module.exports = router;
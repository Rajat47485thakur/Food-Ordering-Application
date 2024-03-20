const express = require('express');
const router = express.Router();
//-----------------userControllers----------------

const userControllers = require('../controllers/user.controllers')
router.post('/registerUser', userControllers.registerUser)
router.get('/loginUser', userControllers.loginUser)
router.get('/retrieveUserProfile/:id', userControllers.retrieveUserProfile)
router.put('/updateProfile/:id', userControllers.updateProfile)

//-----------------storeControllers----------------


const storeControllers = require('../controllers/store.controllers');
router.post('/registerStore', storeControllers.registerStore)


//-----------------menuControllers----------------

const menuControllers = require('../controllers/menu.controllers');
router.post('/foodMenu', menuControllers.foodMenu);
router.get('/storeWithMenu/:id', menuControllers.storeWithMenu);
router.put('/updateFoodItem/:id', menuControllers.updateFoodItem);


//-----------------orderControllers----------------
const orderControllers = require('../controllers/order.controller');
router.get('/getOrder', orderControllers.getOrder)







module.exports = router;
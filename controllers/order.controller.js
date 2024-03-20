const Order = require('../models/order.model');



async function getOrder(req, res) {
    try {

    } catch (err) {
        return res.status(500).json({ message: 'Internal Server error', err });
    }
}





module.exports = {
    getOrder
}
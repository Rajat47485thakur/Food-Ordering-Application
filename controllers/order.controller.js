const Order = require('../models/order.model');
const User = require('../models/user.model');
const Menu = require('../models/menu.model');
const nodemailer = require('../nodemailer/user_mail')


async function browseMenu(req, res) {
    try {
        const menuItems = await Menu.find().populate('store', 'storeName location');
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

async function createOrder(req, res) {
    const { customerId, items } = req.body;

    try {
        const menuItems = await Menu.find({ _id: { $in: items } });

        let totalPrice = 0;
        menuItems.forEach(item => {
            totalPrice += item.price;
        });

        const newOrder = new Order({
            customer: customerId,
            items: items,
            totalPrice: totalPrice,
            status: "Pending"
        });

        const savedOrder = await newOrder.save();
        if (savedOrder) {
            nodemailer.orderStatus("rajat24apptunix@gmail.com", "Order Placed Successfully !")
        }
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



// ----------------Order History: Not Done

 async function orderHistory (req, res)  {
    const customerId = req.params.customerId;

    try {
        const orders = await Order.find({ customer: customerId }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    browseMenu,
    createOrder,
    orderHistory
}
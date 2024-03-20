const Menu = require('../models/menu.model');


async function foodMenu(req, res) {
    try {
        const { itemName, description, price, availability, store } = req.body;
        const menu = await Menu.create({
            itemName,
            description,
            price,
            availability,
            store
        });
        res.status(200).json({ message: "Menu added successfully", menu });
    } catch (err) {
        res.status(500).json({ message: 'Server error:', err });
    }
}

async function storeWithMenu(req, res) {
    try {
        let storeMenu = await Menu.findOne({ store: req.params.id }).populate("store");
        // console.log(storeMenu.store)


        res.status(200).json({ message: `Store's menu retrieved`, storeMenu });
    } catch (err) {
        console.log(err)
        return res.status(400).send("Error while getting stores with menu");
    }
}


async function updateFoodItem(req, res) {
    const menuId = req.params.id;
    const { itemName, description, price, availability, store } = req.body;

    try {
        let menu = await Menu.findById(menuId);
        
        if (!menu) {
            return res.status(404).json({ error: "Menu not found" });
        }

        if (itemName) menu.itemName = itemName;
        if (description) menu.description = description;
        if (price) menu.price = price;
        if (availability) menu.availability = availability;
        if (store) menu.store = store;

    
        updatedMenu = await menu.save();

        res.status(200).json({ message: "Menu updated successfully", updatedMenu });
    } catch (err) {
        return res.status(400).send("There was a problem updating the Menu.");  
    }
};

module.exports = {
    foodMenu,
    storeWithMenu,
    updateFoodItem
}
const Store = require('../models/store.model');



async function registerStore(req, res) {
    try {
        const { storeName, storeCode, location } = req.body
        if (
            [storeName, storeCode, location].some((field) => !field || field.trim() === '')
        ) {
            return res.status(400).send({ error: 'All fields are required' })
        }

        const existedStore = await Store.findOne({
            $or: [
                { storeCode }
            ]
        });
        if (existedStore) {
            return res.status(400).send(`Your Store already exists ! can't register again.`)
        }


        const store = await Store.create({
            storeName,
            storeCode,
            location
        });

        res.status(200).json({ message: 'Store Created Successfully', store });
    } catch (err) {
        res.status(500).json(`Unable to register the Store ! : ${err}`)
    }
}



module.exports = {
    registerStore,

}
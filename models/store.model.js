const { string } = require('joi')
const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema(
    {
        storeName: {
            type: String,
            require: true
        },
        storeCode: {
            type: String,
            unique: true,
            require: true
        },
        location: {
            type: String,
            require: true
        },
    }, { timestaps: true }
)

module.exports = mongoose.model('Store', storeSchema);
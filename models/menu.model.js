const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema(


    {
        itemName: {
            type: String,
            require: true
        },
        description: {
            type: String,
            default: null
        },
        price: {
            type: Number,
            require: true
        },
        availability: {
            type: Boolean,
            default: true
        },
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store'
        }
    },{timestaps:true}

);

module.exports = mongoose.model("Menu", menuSchema);
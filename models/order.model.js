const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        items: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Menu'
            }
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Processing", "Delivered"],
            default: "Pending"
        }
    }, { timestaps: true }
)

module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose')
const addressSchema = mongoose.Schema(
    {
        city: { type: String, required: true },
        line1: { type: String, required: true },
        state: { type: String, required: true },
        postal_code: { type: String, required: true },
    }
)
const orderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,

        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        address: {
            type: addressSchema,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: Boolean,

        }
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)


module.exports = Order;
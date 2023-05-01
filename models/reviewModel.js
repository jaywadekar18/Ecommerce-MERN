const mongoose = require('mongoose');
const review = mongoose.Schema({

    message: {
        type: String,
        requred: true,
    },
    // userName:{
    //     type: String,
    //     requred: true,
    // }
})
const reviewSchema = mongoose.Schema(
    {
        productId: {
            type: String,
            requred: true,
        },
        reviews: {
            type: [review],
        }
    },
    {
        timestamps: true, toJSON: { getters: true }
    }
)

const Review = mongoose.model('Reviews', reviewSchema)


module.exports = Review;
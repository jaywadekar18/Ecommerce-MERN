const express = require('express');
const router = express.Router()
const Cart = require('../models/cartModel')

router.route('/')
    .get(async (req, res) => {

        try {
            const data = await Cart.find()

            res.json(data)
        }
        catch (err) {
            res.json(err)
        }

    })
    .post(async (req, res) => {
        try {
            const cartItem = new Cart(req.body)
            await cartItem.save();
            res.json('Data received!!')

        }
        catch (err) {
            res.json(err);
            console.log(err)
        }
    })
router.route('/:id').delete(async (req, res) => {
    try {
        await Cart.deleteOne({ _id: req.params.id })
        res.json('Data deleted!!')

    }
    catch (err) {
        res.json(err);
        console.log(err)
    }
})


module.exports = router;
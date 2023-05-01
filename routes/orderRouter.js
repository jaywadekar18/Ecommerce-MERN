const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const ErrorHandler = require('../services/ErrorHandlers');
const stripe = require('stripe')('sk_test_51LLpYxSEBIn8xeAarXmRmqS5qPbz3Fv1X0uQ2EeGRoYGy9XHjkLfrtw765dHeduETbqGUMs9RfMF3NoElV2EKpKU00kgM6HGnz');
router.route('/')
  .post(async (req, res) => {
    try {

      const orderItem = new Order(req.body)
      let resu =await orderItem.save();
      res.json({resu})

    }
    catch (err) {
      //next(ErrorHandler.serverError(err.message))
      res.json({ error: err.message })
      console.log(err)
    }
  })


router.route("/payment_intent").post(async (req, res) => {

  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr"
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
})

module.exports = router;
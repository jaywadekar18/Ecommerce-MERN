const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const ErrorHandler = require('../services/ErrorHandlers');

router.route('/')
    .post(async (req, res) => {
        try {
            const alreadyExists = await Review.find({ productId: req.body.productId });
            console.log(" req.body.productId", req.body.productId);
            console.log('alreadyExists', alreadyExists);
            if (alreadyExists?.length > 0) {
                const data = await Review.updateOne({ productId: req.body.productId }, {
                    $push: {
                        reviews: req.body.review,
                    }
                })
                if (!data) {
                    next(ErrorHandler.notFoundError('Could not find'));
                }
                res.json({ data })
            }
            else {
                let formatedData = {
                    productId: req.body.productId,
                    reviews: [req.body.review]
                }
                const review = new Review(formatedData)
                let response = await review.save();
                res.json({ response })
            }
        }
        catch (err) {
            res.json({ error: err.message })
            console.log(err)
        }
    })
router.route('/:id')
    .get(async (req, res, next) => {

        try {
            const data = await Review.find({ productId: req.params.id });
            if (!data) {
                next(ErrorHandler.notFoundError('Could not find data '));
            }

            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })



module.exports = router;
const express = require('express');
const router = express.Router()
const Product = require('../models/productModel');
const auth = require('../middleware/auth');
const fs = require('fs');
const admin = require('../middleware/admin')
const ErrorHandler = require('../services/ErrorHandlers')
var multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    }
});


const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image') // 5mb

router.route('/')
    .get(async (req, res, next) => {

        try {

            const data = await Product.find().select('-updatedAt -__v');

            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })
    .post(async (req, res, next) => {
        try {
            handleMultipartData(req, res, async (err) => {
                if (err) {
                    return next(ErrorHandler.serverError(err.message))
                }
                const filePath = req.file.path;
                console.log(filePath)
                const { name, price, rating, brand, category, description, countInStock } = req.body;
                let productData = { name, price, rating, brand, category, description, countInStock, image: filePath }

                try {
                    const user = new Product(productData);
                    const result = await user.save();
                    res.json('Data received!!')
                }
                catch (err) {
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            next(ErrorHandler.serverError(err.message));
                        }
                    });

                    next(ErrorHandler.serverError(err.message));

                }

            })
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }
    })
    .put(auth, admin, async (req, res, next) => {

        try {
            console.log(req.body)
            const data = await Product.updateOne({ _id: req.body._id }, {
                $set: {
                    name: req.body.name,
                    brand: req.body.brand,
                    countInStock: req.body.countInStock,
                    price: req.body.price,
                    //image:req.body.image,
                    // category:req.body.category,
                    //// rating:req.body.rating,
                    // description:req.body.description,

                }
            })
            if (!data) {
                next(ErrorHandler.notFoundError('Could not find data '));
            }

            res.json(data)
        }
        catch (err) {
            console.log(err)
            next(ErrorHandler.serverError(err.message));
        }

    })
router.route('/:id')
    .delete(async (req, res, next) => {

        try {
            const data = await Product.deleteOne({ _id: req.params.id });
            if (!data) {
                next(ErrorHandler.notFoundError('Could not find data '));

            }

            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })
    .get(async (req, res, next) => {

        try {
            const data = await Product.find({ _id: req.params.id });
            if (!data) {
                next(ErrorHandler.notFoundError('Could not find data '));

            }

            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })
router.route('/search/:name')
    .get(async (req, res, next) => {

        try {
            const data = await Product.find({
                $or: [
                    { name: { "$regex": req.params.name, $options: 'i' } },
                    { brand: { "$regex": req.params.name, $options: 'i' } }
                ]
            })
            if (!data) {
                next(ErrorHandler.notFoundError('Could not find data '));

            }

            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })

///get by category

router.route('/category/:category')
    .get(async (req, res, next) => {

        try {
            console.log("req");
            console.log(req.params);
            const data = await Product.find(
                {
                    category: req.params.category
                })
            //category: { "$regex": req.params.category, $options: 'i' }
            console.log(data);
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
const express = require('express');
const router = express.Router()
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const ErrorHandler = require('../services/ErrorHandlers')
const JwtServices = require('../services/JwtServices');
const auth = require('../middleware/auth')
router.route('/')
    .post(async (req, res, next) => {
        try {

            const { name, email, password, role } = req.body;
            const userInDB = await User.findOne({ email: email });
            if (userInDB) {
                next(ErrorHandler.validationError('This email id is already taken!'));
            }
            const hashedPassword = await bcrypt.hash(password, 10)

            const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
                role: role
            })
            const result = await user.save();
            const accessToken = JwtServices.sign({ _id: result._id })

            res.json({ accessToken: accessToken })

        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
            console.log(err)
        }
    })
    .get(async (req, res, next) => {
        try {


            const data = await User.find();

            res.json(data)

        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
            console.log(err)
        }
    })
    .put(async (req, res, next) => {

        try {
            console.log(req.body)
            const data = await User.updateOne({ _id: req.body._id }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
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
router.route('/login')
    .post(async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                next(ErrorHandler.wrongCredentials('This user does not exists!'));
            }
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                next(ErrorHandler.wrongCredentials('wrong password'));
            }

            const accessToken = JwtServices.sign({ _id: user._id })

            res.json({ accessToken: accessToken })


        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
            console.log(err)
        }
    })

router.route('/me')
    .get(auth, async (req, res) => {

        try {
            console.log(req.user)
            const data = await User.findOne({ _id: req.user._id }).select('-password -updatedAt -__v');
            if (!data) {
                next(ErrorHandler.wrongCredentials('This user does not exists!'));
            }
            res.json(data);

        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })

router.route('/:email')
    .get(async (req, res) => {
        console.log(req.params.id);
        try {
            const data = await User.find({ _id: req.params.id })

            res.json(data);
            console.log(data)
        }
        catch (err) {
            res.json(err);
            console.log(err)
        }
    })
    .delete(async (req, res, next) => {

        try {
            const data = await User.deleteOne({ _id: req.params.email });
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
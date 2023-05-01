const User = require('../models/userModel')
const ErrorHandlers = require('../services/ErrorHandlers')


const admin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            next(ErrorHandlers.unAuthorized('not such record found!!'))
        }
        console.log(user)
        if (user.role === 'admin') {
            next();
        }
        else {
            next(ErrorHandlers.unAuthorized('You are not a admin!!'))
        }


    }
    catch (err) {
        next(ErrorHandlers.serverError())

    }

}
module.exports = admin
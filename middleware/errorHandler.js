
const ErrorHandler = require('../services/ErrorHandlers')
const errorHandler = (err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    } else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
}

const notFound = (req, res, next) => {
    return res.json({error:{ message: `page not found! ${req.originalUrl}` ,status:404 }});
}

module.exports = { notFound, errorHandler };
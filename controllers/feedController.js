const AppError = require("../utils/appError");
exports.testFeed = (req, res, next) => {

    res.status(200).json({
        msg: 'Got to endpoint'
    })
}
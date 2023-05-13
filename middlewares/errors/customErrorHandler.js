const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
    let customError = err;
    console.log(err)
    if (err.name === "CastError") {
        customError = new CustomError("Please provide a valid id", 400)
    }

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message || "Internal server error"
    })
}

module.exports = customErrorHandler
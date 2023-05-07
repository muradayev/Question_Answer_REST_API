const customErrorHandler = (err, req, res, next) => {
    let customError = err;
    console.log(customError.message, customError.status)

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message || "Internal server error"
    })
}

module.exports = customErrorHandler
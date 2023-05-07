const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message || "Internal server error"
    })
}

module.exports = customErrorHandler
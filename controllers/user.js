const User = require("../models/User")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler")

const getUserById = asyncErrorWrapper(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        data: req.data
    })
})

module.exports = {
    getUserById
}
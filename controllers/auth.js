const User = require("../models/User")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler")

const register = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        role: role
    })

    res.status(200).json({
        success: true,
        data: user
    })
})

const errorTest = (req, res, next) => {
    return next(new CustomError("There is an error", 400))
}

module.exports = {
    register,
    errorTest
}
const User = require("../models/User")
const CustomError = require("../helpers/error/CustomError")

const register = async (req, res, next) => {
    const name = "Aysel Memmedova"
    const email = "ayselmmdva@gmail.com"
    const password = "user123"

    try {
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })

        res.status(200).json({
            success: true,
            data: user
        })
    }
    catch (err) {
        return next(err)
    }
}

const errorTest = (req, res, next) => {
    return next(new CustomError("There is an error", 400))
}

module.exports = {
    register,
    errorTest
}
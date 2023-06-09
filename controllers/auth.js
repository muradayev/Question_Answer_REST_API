const User = require("../models/User")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler")
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers")
const { validateUserInput, comparePassword } = require("../helpers/input/inputHelpers")
const sendEmail = require("../helpers/libraries/sendEmail")

const register = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        role: role
    })

    sendJwtToClient(user, res)
})

const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body

    if (!validateUserInput(email, password)) {
        return next(new CustomError("Please enter correct input!", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    const comparePasswordResult = await comparePassword(password, user.password)
    if (!comparePasswordResult) {
        return next(new CustomError("Please check your credentials", 400))
    }

    sendJwtToClient(user, res)
})

const logout = asyncErrorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env

    return res
        .status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true
        })
        .json({
            success: true,
            message: "Logged out successfully"
        })
})

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_image": req.savedProfileImage
    }, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        message: "Image was uploaded successfully",
        data: user
    })
})

const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })
}

const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email
    const user = await User.findOne({ email: resetEmail })
    if (!user) {
        return next(new CustomError("Invalid email"))
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser()
    await user.save()

    const resetPasswordUrl = `http:localhost:5000/api/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`
    const emailTemplate = `
        <h3>Reset your password</h3>
        <p>This <a href='${resetPasswordUrl}' target='_blank'>link</a> will expire in 1 hour</p>
    `

    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset your password",
            html: emailTemplate
        })
        return res.status(200).json({
            success: true,
            message: "Token sent to your email"
        })
    } catch (err) {
        //console.log(err)
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        return next(new CustomError("Email could not be sent", 500))
    }
})

const resetPassword = asyncErrorWrapper(async (req, res, next) => {
    const { resetPasswordToken } = req.query
    const { password } = req.body

    if (!resetPasswordToken) {
        return next(new CustomError("Please provide a valid reset token", 400))
    }

    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new CustomError("Invalid token or Session expired", 404))
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    return res.status(200).json({
        success: true,
        message: "Reset password processed successfully"
    })
})

const updateDetails = asyncErrorWrapper(async (req, res, next) => {
    const updateInformation = req.body
    const user = await User.findByIdAndUpdate(req.user.id, updateInformation, {
        new: true,
        runValidators: true
    })

    if (!user) {
        return next(new CustomError("There is no user with that id"))
    }

    return res.status(200).json({
        success: true,
        data: user
    })
})

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    updateDetails
}
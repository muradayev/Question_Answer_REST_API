const CustomError = require("../../helpers/error/CustomError")
const User = require("../../models/User")
const Question = require("../../models/Question")
const asyncErrorWrapper = require("express-async-handler")
const jwt = require("jsonwebtoken")
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers")

const getAccessToRoute = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env
    if (!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized to access this route!", 401))
    }

    const access_token = getAccessTokenFromHeader(req)
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoced) => {
        if (err) {
            return next(new CustomError("You are not authorized to access this route!", 401))
        }
        req.user = {
            id: decoced.id,
            name: decoced.name
        }
        next()
    })
}

const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.user
    const user = await User.findById(id)

    if (user.role !== "admin") {
        return next(new CustomError("Only admins can access to this route", 403))
    }
    next()
})

const getQuestionOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
    const userId = req.user.id
    const questionId = req.params.id
    const question = await Question.findById(questionId)

    if (!question.user.equals(userId)) {
        return next(new CustomError("Only owner can handle this operation", 403))
    }
    next()

})

module.exports = {
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess
}
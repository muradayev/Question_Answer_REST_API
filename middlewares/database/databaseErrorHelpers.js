const User = require("../../models/User")
const Question = require("../../models/Question")
const CustomError = require("../../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler")

const checkUserExists = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
        return next(new CustomError("There is no such user with that id", 400))
    }
    req.data = user
    next()
})

const checkQuestionExists = asyncErrorWrapper(async (req, res, next) => {
    const question_id = req.params.id || req.params.question_id
    const question = await Question.findById(question_id)
    if (!question) {
        return next(new CustomError("There is no such question with that id"))
    }
    req.data = question
    next()
})


module.exports = {
    checkUserExists,
    checkQuestionExists
}
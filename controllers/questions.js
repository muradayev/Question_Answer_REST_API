const Question = require("../models/Question")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler")

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
    const information = req.body
    const question = await Question.create({
        title: information.title,
        content: information.content,
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        data: question
    })
})

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
    const questions = await Question.find()
    if (!questions) {
        return next(new CustomError("There is no added question"))
    }
    return res.status(200).json({
        success: true,
        data: questions
    })
})

const getQuestionById = asyncErrorWrapper(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        data: req.data
    })
})

const updateQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params
    const { title, content } = req.body

    let question = await Question.findById(id)

    question.title = title
    question.content = content
    question = await question.save()

    return res.status(200).json({
        success: true,
        data: question
    })
})

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion
}
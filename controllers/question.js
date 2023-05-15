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

const updateQuestionById = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params
    const { title, content } = req.body

    let question = await Question.findById(id)

    question.title = !title ? question.title : title
    question.content = !content ? question.content : content
    question = await question.save()

    return res.status(200).json({
        success: true,
        data: question
    })
})

const deleteQuestionById = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params
    await Question.findByIdAndRemove(id)

    return res.status(200).json({
        success: true,
        message: "Question was deleted successfully"
    })
})

const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params
    const question = await Question.findById(id)

    if (question.likes.includes(req.user.id)) {
        return next(new CustomError("You already liked this question", 400))
    }
    question.likes.push(req.user.id)
    await question.save()

    return res.status(200).json({
        success: true,
        data: question
    })
})

const undoLikeQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params
    const question = await Question.findById(id)

    if (!question.likes.includes(req.user.id)) {
        return next(new CustomError("You can't undo like for this question", 400))
    }

    const userIdIndex = question.likes.indexOf(req.user.id)
    question.likes.splice(userIdIndex, 1)
    await question.save()

    return res.status(200).json({
        success: true,
        data: question
    })
})

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById,
    likeQuestion,
    undoLikeQuestion
}
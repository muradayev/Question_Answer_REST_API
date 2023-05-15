const express = require("express")
const router = express.Router({ mergeParams: true })
const { getAccessToRoute } = require("../middlewares/authorization/auth")
const { checkQuestionAndAnswerExists } = require("../middlewares/database/databaseErrorHelpers")
const { addNewAnswerToQuestion,
    getAnswersOfQuestion,
    getSingleAnswer } = require("../controllers/answer")

router.post("/", [getAccessToRoute], addNewAnswerToQuestion)
router.get("/", getAnswersOfQuestion)
router.get("/:answer_id", [checkQuestionAndAnswerExists], getSingleAnswer)
module.exports = router
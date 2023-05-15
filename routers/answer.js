const express = require("express")
const router = express.Router({ mergeParams: true })
const { getAccessToRoute, getAnswerOwnerAccess } = require("../middlewares/authorization/auth")
const { checkQuestionAndAnswerExists } = require("../middlewares/database/databaseErrorHelpers")
const { addNewAnswerToQuestion,
    getAnswersOfQuestion,
    getSingleAnswer,
    updateAnswer } = require("../controllers/answer")

router.post("/", [getAccessToRoute], addNewAnswerToQuestion)
router.get("/", getAnswersOfQuestion)
router.get("/:answer_id", [checkQuestionAndAnswerExists], getSingleAnswer)
router.put("/:answer_id/update", [checkQuestionAndAnswerExists, getAccessToRoute, getAnswerOwnerAccess], updateAnswer)

module.exports = router
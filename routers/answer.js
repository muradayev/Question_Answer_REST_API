const express = require("express")
const router = express.Router({ mergeParams: true })
const { getAccessToRoute, getAnswerOwnerAccess } = require("../middlewares/authorization/auth")
const { checkQuestionAndAnswerExists } = require("../middlewares/database/databaseErrorHelpers")
const { addNewAnswerToQuestion,
    getAnswersOfQuestion,
    getSingleAnswer,
    updateAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer } = require("../controllers/answer")

router.post("/", [getAccessToRoute], addNewAnswerToQuestion)
router.get("/", getAnswersOfQuestion)
router.get("/:answer_id", [checkQuestionAndAnswerExists], getSingleAnswer)
router.get("/:answer_id/like", [checkQuestionAndAnswerExists, getAccessToRoute], likeAnswer)
router.get("/:answer_id/undo_like", [checkQuestionAndAnswerExists, getAccessToRoute], undoLikeAnswer)
router.put("/:answer_id/update", [checkQuestionAndAnswerExists, getAccessToRoute, getAnswerOwnerAccess], updateAnswer)
router.delete("/:answer_id/delete", [checkQuestionAndAnswerExists, getAccessToRoute, getAnswerOwnerAccess], deleteAnswer)

module.exports = router
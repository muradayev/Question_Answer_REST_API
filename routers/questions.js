const express = require("express")
const { checkQuestionExists } = require("../middlewares/database/databaseErrorHelpers")
const { askNewQuestion, getAllQuestions, getQuestionById, updateQuestion } = require("../controllers/questions")
const { getAccessToRoute, getQuestionOwnerAccess } = require("../middlewares/authorization/auth")
const router = express.Router()

router.get("/", getAllQuestions)
router.get("/:id", checkQuestionExists, getQuestionById)
router.post("/ask", getAccessToRoute, askNewQuestion)
router.put("/:id/update", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], updateQuestion)

module.exports = router
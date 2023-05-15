const express = require("express")
const { checkQuestionExists } = require("../middlewares/database/databaseErrorHelpers")
const { askNewQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById,
    likeQuestion,
    undoLikeQuestion } = require("../controllers/questions")
const { getAccessToRoute, getQuestionOwnerAccess } = require("../middlewares/authorization/auth")
const router = express.Router()

router.get("/", getAllQuestions)
router.get("/:id/like", [getAccessToRoute, checkQuestionExists], likeQuestion)
router.get("/:id/undo_like", [getAccessToRoute, checkQuestionExists], undoLikeQuestion)
router.get("/:id", checkQuestionExists, getQuestionById)
router.post("/ask", getAccessToRoute, askNewQuestion)
router.put("/:id/update", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], updateQuestionById)
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], deleteQuestionById)

module.exports = router
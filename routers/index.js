const express = require("express")
const question = require("../routers/question")
const auth = require("../routers/auth")
const router = express.Router()

router.use("/questions", question)
router.use("/auth", auth)

module.exports = router
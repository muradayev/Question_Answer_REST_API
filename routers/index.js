const express = require("express")
const question = require("../routers/questions")
const auth = require("../routers/auth")
const user = require("./user")
const router = express.Router()

router.use("/questions", question)
router.use("/auth", auth)
router.use("/users", user)

module.exports = router
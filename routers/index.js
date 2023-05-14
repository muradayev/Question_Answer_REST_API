const express = require("express")
const question = require("../routers/questions")
const auth = require("../routers/auth")
const user = require("./user")
const admin = require("./admin")
const router = express.Router()

router.use("/questions", question)
router.use("/auth", auth)
router.use("/users", user)
router.use("/admin", admin)

module.exports = router
const express = require("express")
const { getUserById } = require("../controllers/user.js")
const router = express.Router()

router.get("/:id", getUserById)

module.exports = router
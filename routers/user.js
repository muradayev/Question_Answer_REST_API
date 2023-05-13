const express = require("express")
const { getUserById } = require("../controllers/user.js")
const { checkUserExists } = require("../middlewares/database/databaseErrorHelpers.js")
const router = express.Router()

router.get("/:id", checkUserExists, getUserById)

module.exports = router
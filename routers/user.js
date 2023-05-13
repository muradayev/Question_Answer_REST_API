const express = require("express")
const { getUserById, getAllUsers } = require("../controllers/user.js")
const { checkUserExists } = require("../middlewares/database/databaseErrorHelpers.js")
const router = express.Router()

router.get("/:id", checkUserExists, getUserById)
router.get("/", getAllUsers) // api/users

module.exports = router
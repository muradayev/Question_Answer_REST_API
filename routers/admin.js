const express = require("express")
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth")
const { checkUserExists } = require("../middlewares/database/databaseErrorHelpers")
const { blockUser, deleteUser } = require("../controllers/admin")
const router = express.Router()

router.use([getAccessToRoute, getAdminAccess])

router.get("/block/:id", [checkUserExists, blockUser])
router.delete("/user/:id", [checkUserExists, deleteUser])

module.exports = router
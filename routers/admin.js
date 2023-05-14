const express = require("express")
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth")
const { checkUserExists } = require("../middlewares/database/databaseErrorHelpers")
const { blockUser } = require("../controllers/admin")
const router = express.Router()

router.use([getAccessToRoute, getAdminAccess])

router.get("/block/:id", [checkUserExists, blockUser])

module.exports = router
const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Questions home page")
})

module.exports = router
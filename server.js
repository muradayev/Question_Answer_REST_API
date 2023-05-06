const express = require("express")
const dotenv = require("dotenv")
const routers = require("./routers/index")
const connectDatabase = require("./helpers/database/connectDatabase")

const app = express()

// Environments variables
dotenv.config({
    path: "./config/env/config.env"
})
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

// MongoDB connection
connectDatabase()

app.use("/api", routers)

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${NODE_ENV}`)
})

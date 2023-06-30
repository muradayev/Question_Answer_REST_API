const express = require("express")
const dotenv = require("dotenv")
const routers = require("./routers/index")
const connectDatabase = require("./helpers/database/connectDatabase")
const customErrorHandler = require("./middlewares/errors/customErrorHandler")
const path = require("path")

const app = express()

// Express - Body middleware
app.use(express.json())

// Environments variables
dotenv.config({
    path: "./config/env/config.env"
})
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

// MongoDB connection
connectDatabase()

// Routers middleware
app.use("/api", routers)

// Error handling middleware
app.use(customErrorHandler)

// Static files
app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${NODE_ENV}`)
})

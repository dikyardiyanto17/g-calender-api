const cors = require('cors')
require('dotenv').config()
const express = require('express')
const connect = require('./config/mongodb')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandlers')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 3000

connect()

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.use(errorHandler)


mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log("App on port " + port)
    })
})

// module.exports = app
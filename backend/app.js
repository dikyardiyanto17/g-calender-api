const cors = require('cors')
const express = require('express')
const { connect } = require('./config/mongodb')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandlers')
const app = express()
const port = process.env.PORT || 4001


app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.use(errorHandler)

connect().then(() => {
    app.listen(port, () => {
        console.log("App on port " + port)
    })
})

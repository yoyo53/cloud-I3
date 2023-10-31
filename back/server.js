require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const securityMiddleware = require('./middlewares/security')
require('./utils/db.init').createTables()

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors({
  "origin": "*",
  "methods": "GET,PATCH,POST,PUT,DELETE,OPTIONS",
  "allowedHeaders": "X-Requested-With,Content-Type,Authorization"
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/', (req, res) => {
  res.status(200).send('API of Y with Express.js and PostgeSQL')
})

app.use('/auth', require('./routes/auth.routes'))
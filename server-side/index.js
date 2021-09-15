// Using express framework for backend.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db/index.js')
const movieRouter = require('./routes/movie-router')

// user-router.js which is connected to controller's user-ctrl.js so that they can act accordingliy. 
const userRouter = require('./routes/user-router')

const app = express()

// backend server running on 'http://localhost:8000'.
const apiPort = 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', movieRouter)

// all backend work flow(CRUD operations + validations) of signup and login passes through this router link.
app.use('/signup',userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
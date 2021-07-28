const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/movies_data',{ useUnifiedTopology: true },{ useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error hello', e.message)
    })

const db = mongoose.connection

module.exports = db

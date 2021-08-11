const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://Team:abc123xyz@cluster1.leigi.mongodb.net/test',{ useUnifiedTopology: true },{ useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error hello', e.message)
    })

const db = mongoose.connection

module.exports = db

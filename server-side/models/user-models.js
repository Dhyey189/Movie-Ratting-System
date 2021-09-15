const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Here nosql mongodb database is used.
// User is document to store the data of all client who signedUp using Email.
const User = new Schema(
    { 
        displayName: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String, required: true}
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('usersList', User)
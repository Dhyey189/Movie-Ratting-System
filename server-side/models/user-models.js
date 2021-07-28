const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
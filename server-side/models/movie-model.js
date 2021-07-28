const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        name: { type: String, required: true },
        time: { type: [String], required: true },
        rating: { type: Number, required: true },
    },
    { timestamps: true },
)

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

module.exports = mongoose.model('movies', Movie)
module.exports = mongoose.model('users', User)